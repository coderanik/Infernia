# 🔍 The Blackwood Protocol

<div align="center">
  <img src="public/favicon.png" alt="Blackwood Protocol Logo" width="120" height="120" />
</div>

<h3 align="center">An Experimental Formal Logic Engine & AI Murder Mystery</h3>

<div align="center">
  <p>
    Powered by Constraint Satisfaction (CSP), A* Pathfinding, and Model-Based Reflex Agents.
  </p>
</div>

---

## 📜 The Night in Question

Isolated in the fog-bound moors of Victorian England sits **Blackwood Manor**, home to Lord Archibald Blackwood—a ruthless collector, swindler, and keeper of dangerous secrets. At midnight, amidst a torrential thunderstorm, Lord Blackwood is discovered dead. The murder weapon is missing, a window has been shattered from the inside, and a single, cryptic note is pinned to his chest: *"The Serpent has collected its debt."*

Stranded by the storm, four guests remain. Each possesses a severe, undeniable motive. Scotland Yard has deployed an experimental analytical engine: **The Blackwood Protocol**, to definitively untangle the web of alibis, motives, and physical constraints through pure mathematical logic.

## ✨ Features

- **Live Deduction Engine:** Watch the AI parse 12 overlapping forensic and testimonial constraints in real-time, validating hypotheses and backtracking when contradictions arise.
- **Interactive Field Investigation:** A 24x16 interactive canvas map where the AI investigator physically moves between rooms using A* pathfinding to interrogate suspects and examine weapons.
- **Immersive Narrative UI:** A responsive, highly atmospheric Victorian dashboard featuring glassmorphism, dynamic typography, and suspenseful synchronized animations.
- **Algorithmic Transparency:** The application actively explains *why* it makes procedural decisions and how it prunes the decision tree.

## 🧠 Technical Architecture

The core of the simulation is built upon three foundational AI algorithms:

### 1. Constraint Satisfaction Problem (CSP) Solver
The core deduction engine maps the mystery to four categorical variables: **Time**, **Room**, **Weapon**, and **Suspect**.
- **Domains & Variables:** 4 variables, each with 4 possible values (yielding 256 possible initial configurations).
- **Constraints:** 12 strict unary, binary, and conditional rules derived from witness statements and forensic science.
- **Execution:** Uses Backtracking Search combined with Forward Checking to forcefully prune impossible branches early (e.g., ruling out 8 PM based on rigor mortis).

### 2. A* Pathfinding Search
The investigator does not teleport. The Manor is a formal $24 \times 16$ geometric grid containing walls, isolated wings, and bottlenecks.
- Uses **Manhattan Distance** heuristics.
- Guarantees the shortest navigable physical path from the Entrance to any identified Room, visually validating that the murder was physically possible.

### 3. Model-Based Reflex Agent (PEAS)
The system operates as a textbook agent:
- **Performance Measure:** Solving the case with absolute certainty and minimum backtracks.
- **Environment:** The structured semantic domains of the clues and the geometric layout of the Manor.
- **Actuators:** State variable assignments, path traversal commands, and UI updates.
- **Sensors:** The input of the 12 semantic constraints.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS for complex animations
- **Rendering:** HTML5 Canvas API (for A* investigator movement)
- **Icons/Fonts:** Next/Font (`Playfair Display`, `Inter`, `JetBrains Mono`)

## 🚀 Running Locally

Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

```bash
# Clone the repository
git clone https://github.com/your-username/the-blackwood-protocol.git

# Navigate to the project directory
cd "the-blackwood-protocol"

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to initiate the protocol.

## 🤝 Credits

**Build with ❤️ by Anik, Yashi, and Tanvi.**
Developed as an academic AI exploration project combining human-computer interaction, interactive storytelling, and formal logic execution.
