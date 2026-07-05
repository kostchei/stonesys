"""Render print/lulu/interior.md to a Lulu-ready interior PDF.

Usage:
  python handbook/tools/build_lulu_pdf.py
"""

from __future__ import annotations

import html
import json
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import inch
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch as rl_inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path.cwd()
OUT_DIR = ROOT / "print" / "lulu"
CONFIG_PATH = OUT_DIR / "lulu.config.json"
SOURCE_PATH = OUT_DIR / "interior.md"
PDF_PATH = OUT_DIR / "interior.pdf"
FONT_DIR = Path("C:/Windows/Fonts")


def register_fonts() -> None:
    fonts = {
        "StoneSerif": FONT_DIR / "DejaVuSerif.ttf",
        "StoneSerif-Bold": FONT_DIR / "DejaVuSerif-Bold.ttf",
        "StoneSerif-Italic": FONT_DIR / "DejaVuSerif-Italic.ttf",
        "StoneSerif-BoldItalic": FONT_DIR / "DejaVuSerif-BoldItalic.ttf",
        "StoneMono": FONT_DIR / "DejaVuSansMono.ttf",
        "StoneSymbol": FONT_DIR / "seguisym.ttf",
    }
    for name, path in fonts.items():
        pdfmetrics.registerFont(TTFont(name, str(path)))
    pdfmetrics.registerFontFamily(
        "StoneSerif",
        normal="StoneSerif",
        bold="StoneSerif-Bold",
        italic="StoneSerif-Italic",
        boldItalic="StoneSerif-BoldItalic",
    )


def style_sheet(body_size: float, leading: float):
    base = getSampleStyleSheet()
    return {
        "Title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="StoneSerif-Bold",
            fontSize=22,
            leading=26,
            alignment=TA_CENTER,
            spaceAfter=18,
        ),
        "H1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName="StoneSerif-Bold",
            fontSize=17,
            leading=21,
            spaceBefore=14,
            spaceAfter=8,
            keepWithNext=True,
        ),
        "H2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName="StoneSerif-Bold",
            fontSize=13,
            leading=16,
            spaceBefore=11,
            spaceAfter=6,
            keepWithNext=True,
        ),
        "H3": ParagraphStyle(
            "H3",
            parent=base["Heading3"],
            fontName="StoneSerif-Bold",
            fontSize=11,
            leading=14,
            spaceBefore=9,
            spaceAfter=4,
            keepWithNext=True,
        ),
        "H4": ParagraphStyle(
            "H4",
            parent=base["Heading4"],
            fontName="StoneSerif-BoldItalic",
            fontSize=body_size + 0.3,
            leading=leading,
            spaceBefore=7,
            spaceAfter=3,
            keepWithNext=True,
        ),
        "Body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="StoneSerif",
            fontSize=body_size,
            leading=leading,
            spaceAfter=5,
        ),
        "BodyCenter": ParagraphStyle(
            "BodyCenter",
            parent=base["BodyText"],
            fontName="StoneSerif",
            fontSize=body_size,
            leading=leading,
            alignment=TA_CENTER,
            spaceAfter=5,
        ),
        "Small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="StoneSerif",
            fontSize=7.2,
            leading=8.6,
            spaceAfter=3,
        ),
        "List": ParagraphStyle(
            "List",
            parent=base["BodyText"],
            fontName="StoneSerif",
            fontSize=body_size,
            leading=leading,
            leftIndent=14,
            firstLineIndent=-8,
            spaceAfter=3,
        ),
        "Quote": ParagraphStyle(
            "Quote",
            parent=base["BodyText"],
            fontName="StoneSerif-Italic",
            fontSize=body_size,
            leading=leading,
            leftIndent=18,
            rightIndent=12,
            textColor=colors.HexColor("#3f3a34"),
            spaceAfter=5,
        ),
        "Code": ParagraphStyle(
            "Code",
            parent=base["Code"],
            fontName="StoneMono",
            fontSize=7.4,
            leading=9.0,
            leftIndent=8,
            rightIndent=8,
            backColor=colors.HexColor("#f0eee8"),
            borderPadding=4,
            spaceAfter=5,
        ),
        "Footer": ParagraphStyle(
            "Footer",
            fontName="StoneSerif",
            fontSize=7.5,
            leading=8.5,
            textColor=colors.HexColor("#6d665e"),
        ),
    }


def inline_markdown(text: str) -> str:
    placeholders: list[str] = []

    def keep_code(match):
        placeholders.append(
            f'<font name="StoneMono">{html.escape(match.group(1))}</font>'
        )
        return f"@@CODE{len(placeholders) - 1}@@"

    text = re.sub(r"`([^`]+)`", keep_code, text)
    text = html.escape(text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", text)
    for index, value in enumerate(placeholders):
        text = text.replace(f"@@CODE{index}@@", value)
    for symbol in ["▲", "▼", "◆", "✶", "☐", "→"]:
        text = text.replace(symbol, f'<font name="StoneSymbol">{symbol}</font>')
    return text


def split_table_row(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def is_table_separator(line: str) -> bool:
    cells = split_table_row(line)
    return bool(cells) and all(re.fullmatch(r":?-{3,}:?", cell.strip()) for cell in cells)


def build_table(lines: list[str], styles, frame_width: float) -> Table:
    rows = [split_table_row(line) for line in lines if not is_table_separator(line)]
    if not rows:
        return Table([[""]])
    columns = max(len(row) for row in rows)
    normalized = [row + [""] * (columns - len(row)) for row in rows]
    table_style = styles["Small"] if columns > 3 else styles["Body"]
    data = [
        [Paragraph(inline_markdown(cell), table_style) for cell in row]
        for row in normalized
    ]
    col_width = frame_width / columns
    table = Table(data, colWidths=[col_width] * columns, repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#ebe5d9")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#211d19")),
                ("FONTNAME", (0, 0), (-1, 0), "StoneSerif-Bold"),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#b9afa3")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    return table


def flush_paragraph(buffer: list[str], story: list, styles) -> None:
    if not buffer:
        return
    text = " ".join(part.strip() for part in buffer).strip()
    if text:
        story.append(Paragraph(inline_markdown(text), styles["Body"]))
    buffer.clear()


def markdown_to_story(markdown: str, styles, frame_width: float) -> list:
    story: list = []
    paragraph: list[str] = []
    lines = markdown.replace("\r\n", "\n").split("\n")
    i = 0
    in_code = False
    code_lines: list[str] = []

    while i < len(lines):
        raw = lines[i].rstrip()
        line = raw.strip()

        if line.startswith("```"):
            if in_code:
                story.append(Paragraph("<br/>".join(html.escape(x) for x in code_lines), styles["Code"]))
                code_lines = []
                in_code = False
            else:
                flush_paragraph(paragraph, story, styles)
                in_code = True
            i += 1
            continue
        if in_code:
            code_lines.append(raw)
            i += 1
            continue

        if not line:
            flush_paragraph(paragraph, story, styles)
            i += 1
            continue

        if line in {"---", "<!-- PAGEBREAK -->"}:
            flush_paragraph(paragraph, story, styles)
            story.append(PageBreak())
            i += 1
            continue

        if line.startswith("|") and "|" in line[1:]:
            flush_paragraph(paragraph, story, styles)
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                table_lines.append(lines[i].strip())
                i += 1
            story.append(build_table(table_lines, styles, frame_width))
            story.append(Spacer(1, 5))
            continue

        heading = re.match(r"^(#{1,4})\s+(.+)$", line)
        if heading:
            flush_paragraph(paragraph, story, styles)
            level = len(heading.group(1))
            text = inline_markdown(heading.group(2))
            if level == 1:
                style = styles["Title"] if not story else styles["H1"]
                story.append(Paragraph(text, style))
            elif level == 2:
                story.append(Paragraph(text, styles["H2"]))
            elif level == 3:
                story.append(Paragraph(text, styles["H3"]))
            else:
                story.append(Paragraph(text, styles["H4"]))
            i += 1
            continue

        if line.startswith(">"):
            flush_paragraph(paragraph, story, styles)
            story.append(Paragraph(inline_markdown(line.lstrip("> ")), styles["Quote"]))
            i += 1
            continue

        list_match = re.match(r"^([-*]|\d+\.)\s+(.+)$", line)
        if list_match:
            flush_paragraph(paragraph, story, styles)
            marker, text = list_match.groups()
            i += 1
            continuation: list[str] = []
            while i < len(lines):
                next_raw = lines[i].rstrip()
                next_line = next_raw.strip()
                if not next_line:
                    break
                if next_line.startswith("|") or next_line in {"---", "<!-- PAGEBREAK -->"}:
                    break
                if next_line.startswith("#") or next_line.startswith(">") or next_line.startswith("```"):
                    break
                if re.match(r"^([-*]|\d+\.)\s+(.+)$", next_line):
                    break
                if next_raw.startswith("  ") or next_raw.startswith("\t"):
                    continuation.append(next_line)
                    i += 1
                    continue
                break
            if continuation:
                text = " ".join([text, *continuation])
            bullet = "•" if marker in {"-", "*"} else marker
            story.append(
                Paragraph(f"{html.escape(bullet)} {inline_markdown(text)}", styles["List"])
            )
            continue

        paragraph.append(line)
        i += 1

    flush_paragraph(paragraph, story, styles)
    return story


class LuluDocTemplate(BaseDocTemplate):
    def __init__(self, filename, config, styles):
        self.config = config
        self.styles = styles
        page = config["page"]
        pagesize = (page["widthIn"] * rl_inch, page["heightIn"] * rl_inch)
        margins = config["marginsIn"]
        inside = margins["inside"] * rl_inch
        outside = margins["outside"] * rl_inch
        top = margins["top"] * rl_inch
        bottom = margins["bottom"] * rl_inch
        width, height = pagesize

        right_frame = Frame(
            inside,
            bottom,
            width - inside - outside,
            height - top - bottom,
            id="right",
            showBoundary=0,
        )
        left_frame = Frame(
            outside,
            bottom,
            width - inside - outside,
            height - top - bottom,
            id="left",
            showBoundary=0,
        )

        super().__init__(
            filename,
            pagesize=pagesize,
            leftMargin=outside,
            rightMargin=outside,
            topMargin=top,
            bottomMargin=bottom,
        )
        self.addPageTemplates(
            [
                PageTemplate(
                    id="Right",
                    frames=[right_frame],
                    onPage=self.draw_page,
                    autoNextPageTemplate="Left",
                ),
                PageTemplate(
                    id="Left",
                    frames=[left_frame],
                    onPage=self.draw_page,
                    autoNextPageTemplate="Right",
                ),
            ]
        )

    def draw_page(self, canvas, doc):
        width, _height = self.pagesize
        canvas.saveState()
        canvas.setFont("StoneSerif", 7.5)
        canvas.setFillColor(colors.HexColor("#6d665e"))
        label = str(doc.page)
        if doc.page % 2:
            canvas.drawRightString(width - 0.55 * inch, 0.38 * inch, label)
            canvas.drawString(0.95 * inch, 0.38 * inch, "StoneSys Player's Handbook")
        else:
            canvas.drawString(0.55 * inch, 0.38 * inch, label)
            canvas.drawRightString(width - 0.95 * inch, 0.38 * inch, "StoneSys Player's Handbook")
        canvas.restoreState()


def main() -> None:
    register_fonts()
    config = json.loads(CONFIG_PATH.read_text(encoding="utf8"))
    styles = style_sheet(
        config["typography"]["bodySizePt"], config["typography"]["leadingPt"]
    )
    page = config["page"]
    margins = config["marginsIn"]
    frame_width = (
        page["widthIn"] - margins["inside"] - margins["outside"]
    ) * rl_inch
    markdown = SOURCE_PATH.read_text(encoding="utf8")
    story = markdown_to_story(markdown, styles, frame_width)
    PDF_PATH.parent.mkdir(parents=True, exist_ok=True)
    doc = LuluDocTemplate(str(PDF_PATH), config, styles)
    doc.build(story)
    print(f"Wrote {PDF_PATH}")


if __name__ == "__main__":
    main()
