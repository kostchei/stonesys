# Genesys Playbook Conversion Plan

## Scope Checked

- `web/index.html`
- `web/data.js`
- `web/stonetop_playbooks.json`

The loaded app data contains 4 campaigns with 9 archetypes each, for 36 total
playbooks. All 36 still contain traces of the old PbtA / 2d6 chassis.

## Current Traces

| Campaign | Affected | Main traces |
| --- | ---: | --- |
| Stonetop | 9/9 | `roll +STAT`, `10+`, `7-9`, `6-`, miss XP, hold, Stock, Readiness, Loyalty, HP, damage dice |
| Lankhmar | 9/9 | `roll +STAT`, `10+`, `7-9`, advantage, HP, damage dice |
| Dark Sun | 9/9 | mixed move text, partial strain language, HP, damage dice |
| Elfquest Tribal Fantasy | 9/9 | mixed move text, advantage language, HP, damage dice |

The visible page chrome also still has mixed-system language:

- `web/index.html`: `Powered by Genesys Narrative Dice & PbtA Playbooks`
- `web/data.js`: `Hearth Fantasy PbtA`
- `web/data.js`: `Resolves with three-band rolls, miss XP`

## Target Move Format

Each rollable move should use one Genesys-style structure:

- Trigger: `When you...`
- Pool: named stat, trained/signature upgrade, default difficulty, risky flag.
- Results: `Success`, `Advantage`, `Threat`, `Triumph`, `Despair`.
- No embedded `10+`, `7-9`, `6-`, or `roll +STAT` text.

Static moves should stay as standing permissions or costs and should not imply
PbtA roll bands.

## Conversion Rules

| Old text | Genesys conversion |
| --- | --- |
| `roll +STR/DEX/CON/INT/WIS/CHA` | Roll that stat against a stated difficulty. If trained/signature, upgrade one green to yellow. |
| `10+` | Success with strong benefit; usually success plus advantage or a triumph option. |
| `7-9` | Success with threat, limited effect, or a required cost. |
| `6-` / miss | Failure; keep XP-on-failure only as a global StoneSys rule if desired. |
| `advantage` / `disadvantage` | `+1 blue Boost` / `+1 black Setback`. |
| `hold X` | Hold generated through advantage or triumph menus. |
| `Stock`, `Readiness`, `Loyalty`, `Favor` | Named counters earned/spent through Genesys result menus. |
| `HP`, `damage_die`, `armor` | Wound Threshold, Strain Threshold, Soak, Defense, and weapon damage. |
| `level` gates | Talent tier or advancement prerequisite. |

## Work Order

1. Fix visible branding and campaign summaries.
2. Add explicit move metadata for stat, difficulty, trained/signature status,
   and result menu text.
3. Convert Lankhmar, Dark Sun, and Elfquest first because their old-system
   traces are mostly simple move descriptions.
4. Convert Stonetop last because it has bulk extracted insert text, followers,
   Stock, Readiness, level-gated moves, and advancement debris.
5. Update the UI labels from HP/damage-die language to Genesys-facing vitals.
6. Decide whether miss XP remains a deliberate StoneSys hybrid rule; if not,
   remove the automatic XP increment on failed Genesys rolls.

## Verification

After conversion, run:

```sh
rg -i "PbtA|Powered by the Apocalypse|2d6|roll \+|10\+|7-9|6-|weak hit|strong hit|advantage|disadvantage|damage_die|damage die|HP|Readiness|Stock|Loyalty|level [0-9]" web
```

Review remaining hits manually. Some terms, such as `move` or `XP`, may remain
valid StoneSys terms if intentionally kept.
