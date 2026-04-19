# Glossary

JDM / Nissan / tuning terminology you (the AI) will run into in this codebase. Use these correctly in copy — getting any term wrong is a trust killer with this audience.

## Nissan platforms & chassis codes

| Code | Car | Era | Engine |
|---|---|---|---|
| **R32** | Skyline GT-R | 1989–1994 | RB26DETT |
| **R33** | Skyline GT-R | 1995–1998 | RB26DETT |
| **R34** | Skyline GT-R | 1999–2002 | RB26DETT |
| **R35** | GT-R | 2007–present | VR38DETT |
| **Z32** | 300ZX | 1989–2000 | VG30DETT (twin turbo) |
| **Z33** | 350Z | 2002–2009 | VQ35DE / VQ35HR |
| **Z34** | 370Z / Z (new gen) | 2009–present | VQ37VHR / VR30DDTT (new Z) |
| **S13** | Silvia / 240SX (US) | 1989–1994 | SR20DET / KA24DE |
| **S14** | Silvia / 240SX | 1994–1999 | SR20DET |
| **S15** | Silvia (JDM) | 1999–2002 | SR20DET |
| **A31** | Cefiro | 1988–1994 | RB20DET |
| **C33/C34/C35** | Laurel / Skyline | ~1989–2001 | RB20/RB25 variants |
| **Y34 / V35 / V36 / V37** | Infiniti G / Q series | 2002+ | VQ family, VR30 on newer |

## Engine codes (Nissan / JDM)

- **RB26DETT** — 2.6L inline-6 twin-turbo, RWD. Heart of R32–R34 GT-R.
- **RB25DET** — 2.5L inline-6 single-turbo. Common R33 Skyline GTS-t engine.
- **RB20DET** — 2.0L inline-6 single-turbo. Smaller RB.
- **VR38DETT** — 3.8L V6 twin-turbo. R35 GT-R.
- **VR30DDTT** — 3.0L V6 twin-turbo direct-injection. Q60 Red Sport, new Z.
- **VQ35DE / VQ35HR** — 3.5L V6 NA. 350Z and VQ35-era Infinitis.
- **VQ37VHR** — 3.7L V6 NA with VVEL. 370Z, G37.
- **SR20DET** — 2.0L inline-4 single-turbo. Silvia / 240SX in JDM + S13 swap culture.
- **SR20DE** — NA version, less common in performance contexts.
- **KA24DE** — 2.4L inline-4 NA. US-market 240SX original engine; often swapped out for SR20DET.
- **CA18DET** — 1.8L inline-4 turbo. Older S13.

## Tuning tools / platforms

- **ECU** — Engine Control Unit. The car's brain.
- **ECU tune / remap / calibration** — modifying the ECU's fuel, timing, and boost maps.
- **EcuTek** — Third-party tuning platform. Standard on R35 GT-R, Subaru, some Nissan/Infiniti.
- **Cobb** — Accessport device + Accesstuner software. Popular on Subaru, Nissan GT-R, Mazda, Ford.
- **UpRev** — Tuning platform common on VQ-powered cars (350Z/370Z/G37/M37).
- **Nistune** — Tuning for older Nissan ECUs via chip replacement.
- **Standalone ECU** — Replaces factory ECU entirely. Examples: Haltech, Link, MoTeC, AEM, Emtron.
- **Factory ECU reflash** — Keeps factory hardware, flashes new maps.
- **Consult-III+** — Nissan's dealer diagnostic tool. Rav has this; most shops don't.
- **Dyno** — Dynamometer. Measures wheel horsepower and torque.
- **Load-cell dyno** — Can apply load to simulate real driving; better for fine tuning than inertia-only dynos.
- **Datalog** — Recording of engine sensor values during a pull. Essential for tuning.
- **AFR** — Air-fuel ratio. Target ~13.5–14.7 cruise, ~11.0–12.0 at WOT on gasoline; E85 targets are different.
- **Knock / detonation** — Uncontrolled combustion. Tuner's mortal enemy. Good tunes have "clean knock behavior" (near zero knock counts).
- **Timing** — Ignition timing advance, in degrees. Too much → knock. Too little → no power.
- **Closed-loop / open-loop** — ECU self-corrects fueling (closed) vs. follows table (open, usually WOT).
- **Canned tune / off-the-shelf tune** — Pre-made map not calibrated to the specific car. We don't ship these.

## Parts / mods

- **Turbo / supercharger** — Forced induction. Turbo = exhaust-driven, supercharger = belt-driven.
- **Stage 1 / 2 / 3** — Loosely-defined tiers. Stage 1 = bolt-on (intake/exhaust/tune), Stage 2 = adds turbo upgrade or forged internals, Stage 3 = big-turbo / built-motor.
- **Intercooler** — Cools charge air after turbo. Bigger = more cooling but more lag.
- **Downpipe** — Exhaust from turbo to cat. First mod on most turbo cars.
- **Catback** — Exhaust from cat back. Mostly sound, some power.
- **Turboback** — Full exhaust from turbo outlet back. Catback + downpipe + midpipe combined.
- **Injectors** — Sized by flow rate (cc/min or lb/hr). Example: **ID1050x**, **ID725**.
- **Fuel pump** — High-flow pump for more volume. Example: **Walbro 525**.
- **Boost controller** — Electronic control of turbo boost pressure.
- **Wastegate** — Valve that limits turbo boost.
- **Blow-off valve (BOV) / bypass valve** — Vents compressed air on throttle lift.
- **Coilover** — Adjustable suspension (spring + shock combined, often with height/damping adjustment).
- **Corner balance / corner weighting** — Setting each corner's load for optimal handling.
- **Big-brake kit (BBK)** — Upgraded brakes (usually 4–6 piston calipers + larger rotors).
- **Pad compound** — Brake pad material. Examples: Pagid **RSL29**, Endless **MX72**, Hawk **DTC-70**.
- **DOT 4 / Motul RBF660 / Castrol SRF** — Brake fluids with higher boil points for track use.

## Fuels

- **91 / 93 octane** — Pump premium (US). 91 is common in California.
- **100 octane** — Race fuel, unleaded or leaded.
- **E85** — 85% ethanol, 15% gasoline. Higher octane (~105), more fuel volume required, cooler combustion.
- **Flex fuel** — ECU auto-adjusts for gasoline/ethanol blend on the fly.
- **Methanol injection** — Sprays methanol (or meth/water mix) to cool intake charge.

## Events / driving

- **HPDE** — High Performance Driving Event. Open-track driving, instructor-assisted.
- **Track day** — General term for driving on a racetrack.
- **Time Attack (TT)** — Solo fastest-lap competition.
- **Drag** — Straight-line acceleration competition.
- **Roll racing** — Racing from a rolling start (usually highway-style, not endorsed here).
- **Autocross** — Slow-speed cones course. Good for beginners.
- **Stance** — Car-scene aesthetic: low ride height, aggressive wheel fitment. Often non-functional.
- **VIP** — JDM luxury-tuner aesthetic (lowered/widened sedans). Not our core segment but common in the scene.

## Business / shop terms

- **OEM** — Original Equipment Manufacturer.
- **PPI (Pre-Purchase Inspection)** — Inspection before buying a used car. Our `pre-purchase` service page.
- **CEL** — Check Engine Light.
- **DTC** — Diagnostic Trouble Code (e.g. `P0301` = cylinder 1 misfire).
- **OBD / OBD-II** — On-Board Diagnostics. Standard scan-tool connector.
- **Compression test / leak-down test** — Measures engine health.
- **Built motor / built block** — Engine with forged internals for higher power tolerance.
- **Catch can** — Separates oil vapor from blow-by gases before they re-enter intake.
- **Dyno graph / pull** — A power chart from a single dyno run.
- **Scanner / scan tool** — Diagnostic device that reads DTCs and live sensor data.
- **Bi-directional test** — Scanner command that actuates a component (e.g. fuel pump) for testing. Consult-III+ does this for Nissan.

## Abbreviations

| Short | Long |
|---|---|
| WOT | Wide Open Throttle |
| TPS | Throttle Position Sensor |
| MAF | Mass Air Flow sensor |
| MAP | Manifold Absolute Pressure |
| CAS | Crank Angle Sensor |
| IAT | Intake Air Temperature |
| AFR | Air-Fuel Ratio |
| VE | Volumetric Efficiency |
| VVT / VVEL | Variable Valve Timing / Valve Event & Lift (Nissan-specific) |
| MT / AT / DCT | Manual / Automatic / Dual-Clutch Transmission |
| AWD / RWD / FWD | All-Wheel / Rear-Wheel / Front-Wheel Drive |
| LSD | Limited-Slip Differential |
| BPM | Budget Per Month (in financing discussions) |

## Quick hallucination-killers

- R35 GT-R = **VR38DETT**. Not VQ, not RB.
- 350Z has **VQ35** (HR is the updated variant from 2007+).
- 370Z has **VQ37VHR**. The new Z (2023+) has **VR30DDTT**.
- Silvia SR20 is a **4-cylinder**. RB is a **6-cylinder**.
- Consult-III+ is a **Nissan** tool. Don't confuse with generic OBD-II scanners.
- EcuTek is the dominant R35 GT-R tuning platform, not UpRev.
- UpRev is the dominant 350Z / 370Z / G37 platform, not EcuTek.
- Cobb is popular on Subaru + GT-R + Ford — not a catch-all.
