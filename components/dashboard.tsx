// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { MoreHorizontal, Plus, StretchHorizontal } from "lucide-react";
// import { TaskCard } from "./card";
// import { cn } from "@/lib/utils";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "@hello-pangea/dnd";

// // Simple overlay/modal for adding a task
// function AddTaskOverlay({
//   open,
//   onClose,
//   onAdd,
//   colId,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onAdd: (task: any) => void;
//   colId: string;
// }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [progress, setProgress] = useState(0);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
//       <div className="bg-background rounded-xl shadow-xl p-6 w-full max-w-md mx-2">
//         <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
//         <div className="flex flex-col gap-3">
//           <input
//             className="border rounded-md px-3 py-2 text-base"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <textarea
//             className="border rounded-md px-3 py-2 text-base"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={3}
//           />
//           <div className="flex items-center gap-2">
//             <label className="text-sm">Progress:</label>
//             <input
//               type="number"
//               min={0}
//               max={10}
//               className="border rounded-md px-2 py-1 w-16"
//               value={progress}
//               onChange={(e) => setProgress(Number(e.target.value))}
//             />
//             <span className="text-xs text-muted-foreground">/10</span>
//           </div>
//         </div>
//         <div className="flex justify-end gap-2 mt-6">
//           <Button variant="outline" size="sm" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button
//             size="sm"
//             onClick={() => {
//               if (!title.trim()) return;
//               onAdd({
//                 id: Date.now().toString(),
//                 title,
//                 description,
//                 progress,
//                 progressColor:
//                   colId === "done"
//                     ? ("green" as const)
//                     : colId === "inProgress"
//                     ? ("orange" as const)
//                     : ("red" as const),
//                 date: new Date().toLocaleDateString(),
//                 avatars: [],
//               });
//               onClose();
//               setTitle("");
//               setDescription("");
//               setProgress(0);
//             }}
//           >
//             Add Task
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const initialTasks = {
//   todo: [
//     {
//       id: "1",
//       title: "Design new ui presentation",
//       description: "Dribbble marketing",
//       progress: 7,
//       progressColor: "orange" as const,
//       date: "24 Aug 2022",
//       comments: 7,
//       views: 2,
//       avatars: [],
//     },
//     {
//       id: "2",
//       title: "Add more ui/ux mockups",
//       description: "Pinterest promotion",
//       progress: 4,
//       progressColor: "orange" as const,
//       date: "25 Aug 2022",
//       avatars: ["/images/avatar1.png", "/images/avatar2.png"],
//     },
//     {
//       id: "3",
//       title: "Design few mobile screens",
//       description: "Dropbox mobile app",
//       progress: 3,
//       progressColor: "red" as const,
//       date: "26 Aug 2022",
//       comments: 6,
//       views: 4,
//       avatars: [],
//     },
//     {
//       id: "4",
//       title: "Create a tweet and promote",
//       description: "Twitter marketing",
//       progress: 2,
//       progressColor: "red" as const,
//       date: "27 Aug 2022",
//       avatars: ["/images/avatar1.png", "/images/avatar2.png"],
//     },
//   ],
//   inProgress: [
//     {
//       id: "5",
//       title: "Design system update",
//       description: "Oreo website project",
//       progress: 3,
//       progressColor: "orange" as const,
//       date: "12 Nov 2022",
//       avatars: ["/images/avatar1.png", "/images/avatar2.png"],
//     },
//     {
//       id: "6",
//       title: "Create brand guideline",
//       description: "Oreo branding project",
//       progress: 7,
//       progressColor: "orange" as const,
//       date: "13 Nov 2022",
//       comments: 2,
//       views: 13,
//       avatars: [],
//     },
//     {
//       id: "7",
//       title: "Create wireframe for ios app",
//       description: "Oreo ios app project",
//       progress: 4,
//       progressColor: "red" as const,
//       date: "14 Nov 2022",
//       avatars: ["/images/avatar1.png", "/images/avatar2.png"],
//     },
//     {
//       id: "8",
//       title: "Create ui kit for layout",
//       description: "Crypto mobile app",
//       progress: 3,
//       progressColor: "red" as const,
//       date: "15 Nov 2022",
//       comments: 23,
//       views: 12,
//       avatars: [],
//     },
//   ],
//   done: [
//     {
//       id: "9",
//       title: "Add product to the market",
//       description: "UI8 marketplace",
//       progress: 10,
//       progressColor: "green" as const,
//       date: "6 Jan 2022",
//       comments: 1,
//       views: 5,
//       avatars: [],
//     },
//     {
//       id: "10",
//       title: "Launch product promotion",
//       description: "Kickstarter campaign",
//       progress: 10,
//       progressColor: "green" as const,
//       date: "7 Jan 2022",
//       comments: 17,
//       views: 3,
//       avatars: [],
//     },
//     {
//       id: "11",
//       title: "Make twitter banner",
//       description: "Twitter marketing",
//       progress: 10,
//       progressColor: "green" as const,
//       date: "8 Jan 2022",
//       avatars: ["/images/avatar1.png", "/images/avatar2.png"],
//     },
//   ],
// };

// export default function KanbanBoard() {
//   const [columns, setColumns] = useState(initialTasks);
//   const [position, setPosition] = useState("bottom");
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [activeCol, setActiveCol] = useState<string | null>(null);
//   const [activeView, setActiveView] = useState("board");

//   const boardRef = useRef<HTMLDivElement>(null);
//   const addViewRef = useRef<HTMLDivElement>(null);

//   const [borderLeft, setBorderLeft] = useState(0);
//   const [borderWidth, setBorderWidth] = useState(0);

//   // Use useEffect to calculate the border position and width
//   useEffect(() => {
//     if (activeView === "board" && boardRef.current) {
//       setBorderLeft(boardRef.current.offsetLeft);
//       setBorderWidth(boardRef.current.offsetWidth);
//     } else if (activeView === "add-view" && addViewRef.current) {
//       setBorderLeft(addViewRef.current.offsetLeft);
//       setBorderWidth(addViewRef.current.offsetWidth);
//     }
//   }, [activeView]);

//   // Recalculate on window resize to ensure border stays correctly aligned
//   useEffect(() => {
//     const handleResize = () => {
//       // Trigger a re-calculation by setting activeView again (even if it's the same)
//       setActiveView((prev) => prev);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   function handleDragEnd(result: DropResult) {
//     const { source, destination } = result;
//     if (!destination) return;

//     if (source.droppableId === destination.droppableId) {
//       const items = [...columns[source.droppableId as keyof typeof columns]];
//       const [reorderedItem] = items.splice(source.index, 1);
//       items.splice(destination.index, 0, reorderedItem);

//       setColumns({
//         ...columns,
//         [source.droppableId]: items,
//       });
//     } else {
//       const sourceItems = [
//         ...columns[source.droppableId as keyof typeof columns],
//       ];
//       const [movedItem] = sourceItems.splice(source.index, 1);

//       const destItems = [
//         ...columns[destination.droppableId as keyof typeof columns],
//       ];
//       destItems.splice(destination.index, 0, movedItem);

//       setColumns({
//         ...columns,
//         [source.droppableId]: sourceItems,
//         [destination.droppableId]: destItems,
//       });
//     }
//   }

//   function handleAddTask(colId: string) {
//     setActiveCol(colId);
//     setShowOverlay(true);
//   }

//   type ColumnKeys = "todo" | "inProgress" | "done";

//   function handleConfirmAddTask(task: any) {
//     if (!activeCol) return;
//     const columnKey = activeCol as ColumnKeys;
//     setColumns((prev) => ({
//       ...prev,
//       [columnKey]: [task, ...prev[columnKey]],
//     }));
//   }

//   return (
//     <div className="p-4 sm:p-6">
//       <AddTaskOverlay
//         open={showOverlay}
//         onClose={() => setShowOverlay(false)}
//         onAdd={handleConfirmAddTask}
//         colId={activeCol || "todo"}
//       />
//       <div className="hidden md:flex flex-col md:flex-row md:items-center md:justify-between relative mb-6">
//         <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-4 py-4">
//           <div
//             ref={boardRef}
//             className={cn(
//               "flex items-center space-x-2 cursor-pointer transition-all duration-200 py-1"
//             )}
//             onClick={() => setActiveView("board")}
//           >
//             <StretchHorizontal className="w-5 h-5" />
//             <span className="font-medium text-base">Board view</span>
//           </div>

//           <div
//             ref={addViewRef}
//             className={cn(
//               "flex items-center space-x-2 cursor-pointer transition-all duration-200 py-1"
//             )}
//             onClick={() => setActiveView("add-view")}
//           >
//             <Button
//               variant="ghost"
//               size="sm"
//               className="h-5 w-5 rounded-full bg-[#1C1D2214] dark:bg-white dark:text-muted-foreground"
//             >
//               <Plus className="h-3 w-3 text-gray-400 dark:text-black" />
//             </Button>
//             <span className="text-sm">Add View</span>
//           </div>
//         </div>

//         <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-2">
//           <Button variant="ghost" size="sm" className="text-sm">
//             Filter
//           </Button>
//           <div className="flex items-center gap-2 text-base">
//             Sort
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="h-7 w-7 border-[#1C1D221A] border-2 rounded-full"
//                 >
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="min-w-[12rem]">
//                 <DropdownMenuLabel>Sort By</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuRadioGroup
//                   value={position}
//                   onValueChange={setPosition}
//                 >
//                   <DropdownMenuRadioItem value="top">Z-A</DropdownMenuRadioItem>
//                   <DropdownMenuRadioItem value="bottom">
//                     A-Z
//                   </DropdownMenuRadioItem>
//                   <DropdownMenuRadioItem value="right">
//                     Latest
//                   </DropdownMenuRadioItem>
//                 </DropdownMenuRadioGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//           <Button
//             size="sm"
//             className="bg-foreground dark:text-white dark:bg-[#4B69FF] text-background hover:bg-foreground/90 rounded-full text-sm"
//           >
//             New template
//           </Button>
//         </div>

//         {/* The static full-width grey line */}
//         <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1C1D221A] dark:bg-muted-foreground/20" />
//         {/* The moving active border */}
//         <div
//           className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
//           style={{ left: borderLeft, width: borderWidth }}
//         />
//       </div>

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {Object.entries(columns).map(([colId, colTasks]) => (
//             <Droppable key={colId} droppableId={colId}>
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-4 max-w-full sm:max-w-md"
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-semibold text-[#1C1D2280] dark:text-foreground text-base capitalize">
//                       {colId.replace(/([A-Z])/g, " $1")} ({colTasks.length})
//                     </h3>
//                     <div
//                       onClick={() => handleAddTask(colId)}
//                       className="flex items-center gap-2 hover:cursor-pointer"
//                     >
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="h-5 w-5 rounded-full bg-[#1C1D2214] dark:bg-white dark:text-muted-foreground cursor-pointer"
//                         onClick={() => handleAddTask(colId)}
//                       >
//                         <Plus className="h-3 w-3 text-gray-400 dark:text-black" />
//                       </Button>
//                       <span className="text-base font-semibold">Add New Task</span>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     {colTasks.map((task, index) => (
//                       <Draggable
//                         key={task.id}
//                         draggableId={task.id}
//                         index={index}
//                       >
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                           >
//                             <TaskCard {...task} />
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                     {colId === "done" && (
//                       <div className="py-10 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center text-muted-foreground h-50">
//                         Drag your task here...
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// }



"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, StretchHorizontal } from "lucide-react";
import { TaskCard } from "./card";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

// ✅ Task type
type Task = {
  id: string;
  title: string;
  description: string;
  progress: number;
  progressColor: "red" | "orange" | "green";
  date: string;
  comments?: number;
  views?: number;
  avatars: string[];
};

// ✅ Columns type
type Columns = {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
};

type ColumnKeys = keyof Columns;

// ---------------- AddTaskOverlay ----------------
function AddTaskOverlay({
  open,
  onClose,
  onAdd,
  colId,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (task: Task) => void;
  colId: string;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-background rounded-xl shadow-xl p-6 w-full max-w-md mx-2">
        <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
        <div className="flex flex-col gap-3">
          <input
            className="border rounded-md px-3 py-2 text-base"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border rounded-md px-3 py-2 text-base"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          <div className="flex items-center gap-2">
            <label className="text-sm">Progress:</label>
            <input
              type="number"
              min={0}
              max={10}
              className="border rounded-md px-2 py-1 w-16"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
            />
            <span className="text-xs text-muted-foreground">/10</span>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => {
              if (!title.trim()) return;
              onAdd({
                id: Date.now().toString(),
                title,
                description,
                progress,
                progressColor:
                  colId === "done"
                    ? "green"
                    : colId === "inProgress"
                    ? "orange"
                    : "red",
                date: new Date().toLocaleDateString(),
                avatars: [],
              });
              onClose();
              setTitle("");
              setDescription("");
              setProgress(0);
            }}
          >
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---------------- Initial Tasks ----------------
const initialTasks: Columns = {
  todo: [
    {
      id: "1",
      title: "Design new ui presentation",
      description: "Dribbble marketing",
      progress: 7,
      progressColor: "orange",
      date: "24 Aug 2022",
      comments: 7,
      views: 2,
      avatars: [],
    },
    {
      id: "2",
      title: "Add more ui/ux mockups",
      description: "Pinterest promotion",
      progress: 4,
      progressColor: "orange",
      date: "25 Aug 2022",
      avatars: ["/images/avatar1.png", "/images/avatar2.png"],
    },
    {
      id: "3",
      title: "Design few mobile screens",
      description: "Dropbox mobile app",
      progress: 3,
      progressColor: "red",
      date: "26 Aug 2022",
      comments: 6,
      views: 4,
      avatars: [],
    },
    {
      id: "4",
      title: "Create a tweet and promote",
      description: "Twitter marketing",
      progress: 2,
      progressColor: "red",
      date: "27 Aug 2022",
      avatars: ["/images/avatar1.png", "/images/avatar2.png"],
    },
  ],
  inProgress: [
    {
      id: "5",
      title: "Design system update",
      description: "Oreo website project",
      progress: 3,
      progressColor: "orange",
      date: "12 Nov 2022",
      avatars: ["/images/avatar1.png", "/images/avatar2.png"],
    },
    {
      id: "6",
      title: "Create brand guideline",
      description: "Oreo branding project",
      progress: 7,
      progressColor: "orange",
      date: "13 Nov 2022",
      comments: 2,
      views: 13,
      avatars: [],
    },
    {
      id: "7",
      title: "Create wireframe for ios app",
      description: "Oreo ios app project",
      progress: 4,
      progressColor: "red",
      date: "14 Nov 2022",
      avatars: ["/images/avatar1.png", "/images/avatar2.png"],
    },
    {
      id: "8",
      title: "Create ui kit for layout",
      description: "Crypto mobile app",
      progress: 3,
      progressColor: "red",
      date: "15 Nov 2022",
      comments: 23,
      views: 12,
      avatars: [],
    },
  ],
  done: [
    {
      id: "9",
      title: "Add product to the market",
      description: "UI8 marketplace",
      progress: 10,
      progressColor: "green",
      date: "6 Jan 2022",
      comments: 1,
      views: 5,
      avatars: [],
    },
    {
      id: "10",
      title: "Launch product promotion",
      description: "Kickstarter campaign",
      progress: 10,
      progressColor: "green",
      date: "7 Jan 2022",
      comments: 17,
      views: 3,
      avatars: [],
    },
    {
      id: "11",
      title: "Make twitter banner",
      description: "Twitter marketing",
      progress: 10,
      progressColor: "green",
      date: "8 Jan 2022",
      avatars: ["/images/avatar1.png", "/images/avatar2.png"],
    },
  ],
};

// ---------------- KanbanBoard Component ----------------
export default function KanbanBoard() {
  const [columns, setColumns] = useState<Columns>(initialTasks);
  const [position, setPosition] = useState<"top" | "bottom" | "right">("bottom");
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeCol, setActiveCol] = useState<ColumnKeys | null>(null);
  const [activeView, setActiveView] = useState<"board" | "add-view">("board");

  const boardRef = useRef<HTMLDivElement>(null);
  const addViewRef = useRef<HTMLDivElement>(null);

  const [borderLeft, setBorderLeft] = useState(0);
  const [borderWidth, setBorderWidth] = useState(0);

  // Calculate border position
  useEffect(() => {
    if (activeView === "board" && boardRef.current) {
      setBorderLeft(boardRef.current.offsetLeft);
      setBorderWidth(boardRef.current.offsetWidth);
    } else if (activeView === "add-view" && addViewRef.current) {
      setBorderLeft(addViewRef.current.offsetLeft);
      setBorderWidth(addViewRef.current.offsetWidth);
    }
  }, [activeView]);

  // Recalculate on resize
  useEffect(() => {
    const handleResize = () => setActiveView((prev) => prev);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const items = [...columns[source.droppableId as ColumnKeys]];
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setColumns({ ...columns, [source.droppableId]: items });
    } else {
      const sourceItems = [...columns[source.droppableId as ColumnKeys]];
      const [movedItem] = sourceItems.splice(source.index, 1);

      const destItems = [...columns[destination.droppableId as ColumnKeys]];
      destItems.splice(destination.index, 0, movedItem);

      setColumns({
        ...columns,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      });
    }
  }

  function handleAddTask(colId: ColumnKeys) {
    setActiveCol(colId);
    setShowOverlay(true);
  }

  function handleConfirmAddTask(task: Task) {
    if (!activeCol) return;
    setColumns((prev) => ({
      ...prev,
      [activeCol]: [task, ...prev[activeCol]],
    }));
  }


  function handlePositionChange(val: string) {
  if (val === "top" || val === "bottom" || val === "right") {
    setPosition(val);
  }
}

  return (
    <div className="p-4 sm:p-6">
      <AddTaskOverlay
        open={showOverlay}
        onClose={() => setShowOverlay(false)}
        onAdd={handleConfirmAddTask}
        colId={activeCol || "todo"}
      />

      {/* Top navigation */}
      <div className="hidden md:flex flex-col md:flex-row md:items-center md:justify-between relative mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-4 py-4">
          <div
            ref={boardRef}
            className={cn(
              "flex items-center space-x-2 cursor-pointer transition-all duration-200 py-1"
            )}
            onClick={() => setActiveView("board")}
          >
            <StretchHorizontal className="w-5 h-5" />
            <span className="font-medium text-base">Board view</span>
          </div>

          <div
            ref={addViewRef}
            className={cn(
              "flex items-center space-x-2 cursor-pointer transition-all duration-200 py-1"
            )}
            onClick={() => setActiveView("add-view")}
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 rounded-full bg-[#1C1D2214] dark:bg-white dark:text-muted-foreground"
            >
              <Plus className="h-3 w-3 text-gray-400 dark:text-black" />
            </Button>
            <span className="text-sm">Add View</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-2">
          <Button variant="ghost" size="sm" className="text-sm">
            Filter
          </Button>
          <div className="flex items-center gap-2 text-base">
            Sort
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 border-[#1C1D221A] border-2 rounded-full"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[12rem]">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  // value={position}
                  // onValueChange={setPosition}
                  value={position} 
                  onValueChange={handlePositionChange}
                >
                  <DropdownMenuRadioItem value="top">Z-A</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">A-Z</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">Latest</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            size="sm"
            className="bg-foreground dark:text-white dark:bg-[#4B69FF] text-background hover:bg-foreground/90 rounded-full text-sm"
          >
            New template
          </Button>
        </div>

        {/* Static full-width grey line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1C1D221A] dark:bg-muted-foreground/20" />
        {/* Moving active border */}
        <div
          className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
          style={{ left: borderLeft, width: borderWidth }}
        />
      </div>

      {/* Kanban board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(columns).map(([colId, colTasks]) => (
            <Droppable key={colId} droppableId={colId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-4 max-w-full sm:max-w-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[#1C1D2280] dark:text-foreground text-base capitalize">
                      {colId.replace(/([A-Z])/g, " $1")} ({colTasks.length})
                    </h3>
                    <div
                      onClick={() => handleAddTask(colId as ColumnKeys)}
                      className="flex items-center gap-2 hover:cursor-pointer"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 rounded-full bg-[#1C1D2214] dark:bg-white dark:text-muted-foreground cursor-pointer"
                      >
                        <Plus className="h-3 w-3 text-gray-400 dark:text-black" />
                      </Button>
                      <span className="text-base font-semibold">Add New Task</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {colTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard {...task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {colId === "done" && (
                      <div className="py-10 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center text-muted-foreground h-50">
                        Drag your task here...
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
