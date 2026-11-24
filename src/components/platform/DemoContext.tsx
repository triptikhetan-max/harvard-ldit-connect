import { createContext, useContext, useState, type ReactNode } from "react";
import {
  alumni,
  blankAlum,
  jobs,
  events,
  sampleStudent,
  resources,
  type Alum,
  type Student,
  type Job,
  type NetworkEvent,
} from "@/data/mockData";
type DemoState = {
  role: "Student" | "Alum";
  setRole: (v: "Student" | "Alum") => void;
  student: Student;
  setStudent: (v: Student) => void;
  myAlum: Alum;
  setMyAlum: (v: Alum) => void;
  alums: Alum[];
  jobList: Job[];
  addJob: (v: Job) => void;
  eventList: NetworkEvent[];
  addEvent: (v: NetworkEvent) => void;
  going: string[];
  toggleGoing: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  selected: string[];
  setSelected: (v: string[]) => void;
  steps: Record<string, boolean>;
  toggleStep: (id: string) => void;
  resourceList: typeof resources;
  addResource: (v: (typeof resources)[number]) => void;
  thoughts: string[];
  addThought: (text: string) => void;
};
const Context = createContext<DemoState | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<"Student" | "Alum">("Student");
  const [student, setStudent] = useState(sampleStudent);
  const [myAlum, setMyAlum] = useState(blankAlum);
  const [jobList, setJobs] = useState(jobs);
  const [eventList, setEvents] = useState(events);
  const [going, setGoing] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [steps, setSteps] = useState<Record<string, boolean>>({});
  const [resourceList, setResources] = useState(resources);
  const [thoughts, setThoughts] = useState<string[]>([]);
  const toggle = (values: string[], id: string) =>
    values.includes(id) ? values.filter((v) => v !== id) : [...values, id];
  return (
    <Context.Provider
      value={{
        role,
        setRole,
        student,
        setStudent,
        myAlum,
        setMyAlum,
        alums: [...alumni, ...(myAlum.optedIn ? [myAlum] : [])],
        jobList,
        addJob: (j) => setJobs((v) => [j, ...v]),
        eventList,
        addEvent: (e) => setEvents((v) => [e, ...v]),
        going,
        toggleGoing: (id) => setGoing((v) => toggle(v, id)),
        favorites,
        toggleFavorite: (id) => setFavorites((v) => toggle(v, id)),
        selected,
        setSelected,
        steps,
        toggleStep: (id) => setSteps((v) => ({ ...v, [id]: !v[id] })),
        resourceList,
        addResource: (r) => setResources((v) => [...v, r]),
        thoughts,
        addThought: (text) => setThoughts((v) => [text, ...v]),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useDemo() {
  const context = useContext(Context);
  if (!context) throw new Error("DemoProvider required");
  return context;
}
