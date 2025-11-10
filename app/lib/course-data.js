const operatingSystemLessons = [
    {
        id: 1,
        title: "A PROGRAM is not a PROCESS.",
        description: "Learn the crucial distinction between a static Program and an active Process in computing, including the memory structure of a running process and how interpreted languages fit into this model.",
        videoUrl: "https://www.youtube.com/embed/7ge7u5VUSbE",
        documentation: "The video explains the critical difference between a Program and a Process in computer science. A Program is a passive entity, which is simply a file on your disk, like an executable file, containing instructions and data. It is static and waits for the user to start it. In contrast, a Process is an active entity, defined as a program that is currently running or executing. If you open the same application multiple times, the single program creates multiple, independent processes, each with its own execution sequence. \n\nWhen a program becomes a process, it is loaded into the computer's memory, which is organized into four main sections. These include the Text Section for the executable code (which never changes), the Data Section for global variables (whose values can change), and two dynamic sections, the Stack and the Heap, which constantly grow and shrink to hold data generated at runtime, such as temporary variables and user input. \n\nThe video also covers interpreted languages like Python. For these, the user's source code is not the program itself because the computer cannot execute the text directly. Instead, the Program that gets executed is the Python Interpreter. A Process is then created for the running Interpreter, and the user's source code is treated as data that the Interpreter process works with.",
        quiz: {
            questions: [
                {
                    question: "In computer science, what is an 'active entity' that represents a program that is currently running?",
                    options: [
                        "Program",
                        "File",
                        "Process",
                        "Instruction"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "What is the defining characteristic of a Program, as explained in the video?",
                    options: [
                        "It is a complex memory structure",
                        "It is a dynamic data stream",
                        "It is a passive entity stored on disk",
                        "It is the operating system itself"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Which memory section of a process holds the actual executable instructions and remains constant in size and content?",
                    options: [
                        "Heap",
                        "Stack",
                        "Data Section",
                        "Text Section"
                    ],
                    correctAnswer: 3
                },
                {
                    question: "If you open a text editor twice to work on two different files, how many processes are created?",
                    options: [
                        "One program and one process",
                        "One program and two processes",
                        "Two programs and one process",
                        "Two programs and two processes"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Which two memory sections are dynamic, meaning they grow and shrink to store runtime data like temporary variables?",
                    options: [
                        "Text Section and Data Section",
                        "Stack and Heap",
                        "Text Section and Stack",
                        "Data Section and Heap"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "For interpreted languages like Python, what entity is the operating system instructed to run when you execute a source code file?",
                    options: [
                        "The user's source code file",
                        "The compiler",
                        "The system kernel",
                        "The Interpreter program"
                    ],
                    correctAnswer: 3
                }
            ]
        }
    },
    {
        id: 2,
        title: "The Most Successful Idea in Computer Science",
        description: "An in-depth look at what a process is, the problems of concurrent execution, and how context switching solves security and correctness issues in operating systems.",
        videoUrl: "https://www.youtube.com/embed/dI64JeCIO8k",
        documentation: "The video explores the fundamental concept of a process in computer science. A process is defined as a program in execution, which is distinct from a program which is a passive entity like an executable file. The operating system manages processes, allocating resources like memory—referred to as the address space—and allowing multiple processes to share the Central Processing Unit, a concept called concurrency. Simply alternating CPU access between processes creates two major issues: a security risk where a process could read sensitive data left in the CPU registers by another process, and a correctness issue where a process could overwrite the state of another, causing it to fail or produce incorrect results when it resumes. The solution is the context switch. A context switch is a kernel routine that captures the entire CPU state of an interrupted process (including registers, flags, and program counter) and safely stores it in a special data structure called the Process Control Block (PCB). It then restores the CPU state of the next process from its PCB, ensuring each process operates in its own isolated context and resumes exactly where it left off. The PCB acts as the repository for all the data needed to manage, start, and resume a process, and it is the representation of the process that is placed in the CPU scheduling queue.",
        quiz: {
            questions: [
                {
                    question: "What is the difference between a program and a process?",
                    options: [
                        "A program is a passive file; a process is that program in execution.",
                        "A program is written in a high-level language; a process is written in assembly.",
                        "A program manages hardware; a process manages files.",
                        "They are two names for the exact same thing."
                    ],
                    correctAnswer: 0
                },
                {
                    question: "Which two major issues arise from simply alternating CPU access between multiple processes without any security measures?",
                    options: [
                        "High power consumption and excessive heat.",
                        "Limited network speed and application crashes.",
                        "Security risk and correctness of execution.",
                        "Disk fragmentation and slow boot time."
                    ],
                    correctAnswer: 2
                },
                {
                    question: "What is the mechanism that ensures processes can share the CPU securely and correctly?",
                    options: [
                        "Virtual Memory",
                        "File Allocation Table",
                        "Context Switch",
                        "Kernel Panic"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "The memory allocated to a process is specifically referred to as what?",
                    options: [
                        "The buffer pool",
                        "The address space",
                        "The stack pointer",
                        "The I/O block"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What special data structure does the operating system use to store all the information needed to resume an interrupted process?",
                    options: [
                        "Peripheral Component Interconnect",
                        "Process Configuration Byte",
                        "Process Control Block (PCB)",
                        "Central Processing Unit"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "What essential components are saved during the 'capturing the current state of the CPU' phase of a context switch?",
                    options: [
                        "The computer's BIOS and Bootloader.",
                        "The user's documents and application files.",
                        "The process ID, channel name, and view count.",
                        "Registers, flags, and the program counter."
                    ],
                    correctAnswer: 3
                }
            ]
        }
    },
    {
        id: 3,
        title: "IPC: To Share Memory Or To Send Messages",
        description: "An explanation of Inter-Process Communication (IPC) in operating systems, detailing the two fundamental models: shared memory and message passing.",
        videoUrl: "https://www.youtube.com/embed/Y2mDwW2pMv4",
        documentation: "The video explains Inter-Process Communication (IPC), which is necessary for processes to cooperate and exchange data, despite the operating system's default isolation policy. A process is defined as the entire context a program runs in, including CPU state and memory. Cooperation is vital for computational speedup (parallelism) and system modularity. The two fundamental IPC models are Shared Memory and Message Passing. The Shared Memory model allows processes to access a shared region of memory directly. After the initial system calls to create and attach the region, processes can read and write data extremely fast, essentially as fast as direct memory access. However, the OS stops managing the region, making programmers responsible for data structure, location, and synchronization, which can lead to issues like race conditions. The Message Passing model keeps process address spaces completely isolated. Communication is facilitated by the OS kernel, which creates a link (like a mailbox or port) in its own address space. Processes must use system calls (send and receive) for every message transaction. This is inherently safer and allows processes on different machines to communicate, exemplified by the socket interface. However, the constant use of system calls makes this approach slower than shared memory.",
        quiz: {
            questions: [
                {
                    question: "What are the two fundamental models of Inter-Process Communication (IPC)?",
                    options: [
                        "Threads and Forks",
                        "Shared Memory and Message Passing",
                        "Kernel and User Space",
                        "Pipes and Sockets"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the main reason an operating system enforces isolation between processes?",
                    options: ["To increase computational speed", "To ensure data safety and prevent unauthorized memory access", "To enable communication", "To support modular system design"],
                    correctAnswer: 1
                },
                {
                    question: "Which IPC model is typically the fastest for communication *after* the initial setup?",
                    options: ["Remote Procedure Calls", "Message Passing", "Pipes", "Shared Memory"],
                    correctAnswer: 3
                },
                {
                    question: "In the Shared Memory model, what are processes responsible for managing to avoid issues like race conditions?",
                    options: ["Enforcing the memory isolation policy", "Data structure, location, and synchronization", "Creating the system calls for memory attachment", "Allocating the kernel's address space"],
                    correctAnswer: 1
                },
                {
                    question: "In the Message Passing model, where does the operating system kernel typically create the mailbox (or port) for message exchange?",
                    options: ["In the shared memory region", "In the sending process's address space", "In its own address space", "In the network interface card's buffer"],
                    correctAnswer: 2
                },
                {
                    question: "The need for a system call on every send or receive operation is a primary performance drawback of which IPC model?",
                    options: ["Shared Memory", "Process Isolation", "Message Passing", "Multithreading"],
                    correctAnswer: 2
                },
                {
                    question: "Which message passing mechanism is widely used for client-server architecture, even between processes on different machines?",
                    options: ["Shared Memory blocks", "Direct Memory Access", "The socket interface", "Race condition locks"],
                    correctAnswer: 2
                }
            ]
        }
    },
    {
        id: 4,
        title: "Why Threads are Needed on Single Core Processors",
        description: "An explanation of why threads are essential for achieving concurrency and maximizing CPU utilization, contrasting them with the limitations and overhead of multi-process architecture.",
        videoUrl: "https://www.youtube.com/embed/M9HHWFp84f0",
        documentation: "This video explores the fundamental concept of threads and their necessity in computing, even on single-core systems. The core goal of using threads is concurrency, which is the illusion of multiple tasks running at once, allowing the CPU to be fully utilized. When a process encounters a slow input or output (IO) operation, it must wait, leaving the CPU idle. This is known as a blocking effect. Historically, a server solution was to create a whole new process for every client task, but this is inefficient due to the high memory overhead and the time it takes to spawn an entire process, which includes a separate address space. The better solution is threads. A thread is a lightweight unit of execution that exists within a process. Threads share the process's main resources, such as the entire memory address space (Heap and Code sections) and open files. However, each thread must have its own CPU state, which includes a program counter, a register set, and a separate stack. By having their own CPU state, threads allow the operating system to alternate the CPU among them, effectively filling the IO waiting gaps without the heavy overhead of creating a new process. From the operating system's viewpoint, threads are the most basic unit of execution, replacing the process as the primary entity for scheduling.",
        quiz: {
            questions: [
                {
                    question: "What is the primary problem that threads solve, even in single-core systems?",
                    options: [
                        "The inability to store files permanently",
                        "Wasted CPU time due to a process waiting for a slow IO operation",
                        "The need for separate operating systems for each program",
                        "Excessive memory consumption by the kernel"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "In a single-threaded process, why is it impossible to run two functions asynchronously?",
                    options: [
                        "The CPU can only execute one program at a time",
                        "The process only has a single program counter to track its execution state",
                        "There is no shared memory available",
                        "The operating system blocks all internal concurrency"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Compared to a process, which of the following resources is shared by all threads within that process?",
                    options: [
                        "Program Counter",
                        "Stack Pointer",
                        "Memory Address Space (Heap and Code)",
                        "Register Set"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Which resource must each thread have separately to prevent local variables from being overwritten by other threads?",
                    options: [
                        "The Heap memory",
                        "The Text (Code) section",
                        "The Process ID",
                        "Its own Stack memory"
                    ],
                    correctAnswer: 3
                },
                {
                    question: "Why is the multi-threaded approach generally considered a performance improvement over the multi-process approach for handling many client requests?",
                    options: [
                        "Processes are unable to handle IO operations",
                        "Threads consume less memory and are much faster to create than full processes",
                        "Threads can use specialized hardware unavailable to processes",
                        "Only processes can cause a blocking effect"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "From the operating system's perspective, what is the most basic unit of execution for scheduling purposes?",
                    options: [
                        "The Program",
                        "The Process",
                        "The Thread",
                        "The System Call"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "What term describes the technique where the operating system rapidly switches the CPU between multiple tasks to create the illusion of simultaneous execution?",
                    options: [
                        "Parallelism",
                        "Virtualization",
                        "Concurrency",
                        "Synchronization"
                    ],
                    correctAnswer: 2
                }
            ]
        }
    },
    {
        id: 5,
        title: "Threads on Multicore Systems: Concurrency vs. Parallelism",
        description: "A deep dive into the function of threads in multi-core systems, explaining the key distinction between concurrency and true parallelism and how it boosts application performance.",
        videoUrl: "https://www.youtube.com/embed/5sw9XJokAqw",
        documentation: "The video focuses on the role of threads in computer systems with multi-core processors. It first reviews concurrency, which is the operating system's trick to make it look like multiple tasks are running at once on a single core by rapidly switching the CPU between them. Threads are a way for programmers to tell the OS that different parts of a program can run concurrently. On a single-core system, threads allow the CPU to perform other tasks while one task is blocked waiting for slow I/O operations. In contrast, on a multi-core system, threads enable true parallelism, meaning different tasks can execute simultaneously by assigning each thread to a separate core. The video draws a clear distinction: concurrency is about progress (all tasks moving forward) while parallelism is about simultaneous execution (more than one task running at the exact same moment). This is a major advantage for performance. The two main types of parallelism discussed are Data Parallelism, where the same operation is performed on different subsets of data across multiple cores, and Task Parallelism, where different operations (tasks/threads) work on the same or different data simultaneously. The OS manages the scheduling, but the number of tasks that can run in true parallel is limited to the number of available cores.",
        quiz: {
            questions: [
                {
                    question: "What is the key distinction between concurrency and parallelism as discussed in the video?",
                    options: [
                        "Concurrency is only used on multi-core systems, while parallelism is for single-core systems",
                        "Concurrency is the illusion of simultaneous execution, while parallelism is true simultaneous execution",
                        "Concurrency is achieved with processes, while parallelism is achieved with threads",
                        "Concurrency is faster than parallelism"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the maximum number of threads that can execute in true parallel at any given time on a multi-core system?",
                    options: ["An infinite number", "The number of threads created by the programmer", "Up to the number of available cores", "Twice the number of available cores"],
                    correctAnswer: 2
                },
                {
                    question: "Which of the following is an example of Data Parallelism?",
                    options: [
                        "One thread managing the user interface and another managing network uploads",
                        "Splitting a large list of numbers into four parts and assigning the same 'find prime numbers' check to four different cores",
                        "One core calculating the maximum value and another calculating the minimum value on the same data set",
                        "A single core rapidly switching between five different threads"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Which of the following is an example of Task Parallelism?",
                    options: [
                        "Breaking a large file into chunks for processing by a single thread",
                        "Assigning different, unique operations (like finding max, min, and mean) to separate cores on the same data set",
                        "Having a single core handle all tasks one after the other in sequence",
                        "Using a single thread to manage all client requests"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "On a single-core processor, what is the primary purpose of using threads?",
                    options: [
                        "To allow tasks to truly run simultaneously",
                        "To prevent the CPU from becoming idle when one task is waiting for a slow I/O resource",
                        "To increase the speed of the CPU clock",
                        "To enable the program to compile for a specific number of cores"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "To the operating system, what does each core inside a multi-core processor appear as?",
                    options: ["A single, shared processing unit", "An independent processing unit (a separate processor)", "A software layer or virtual machine", "A secondary storage device"],
                    correctAnswer: 1
                }
            ]
        }
    }
]

export const courses = [
    {
        id: "operating-system",
        title: "Operating System",
        description: "Master the fundamentals of Operating Systems",
        longDescription:
            "Comprehensive course covering all aspects of operating systems including process management, memory management, file systems, and I/O management.",
        category: "Computer Science",
        instructor: {
            name: "HubIt",
            bio: "Professional Operating System Course",
        },
        rating: 4.9,
        reviews: 450,
        students: 5200,
        price: 0,
        image: "💻",
        duration: "6 weeks",
        level: "Beginner",
        tags: ["Operating System", "Computer Science", "System Programming"],
        lessons: operatingSystemLessons,
    },
]

export function getCourseById(id) {
    return courses[0]
}

export function getCoursesByCategory(category) {
    return courses.filter((course) => course.category === category)
}

export function getCategories() {
    return Array.from(new Set(courses.map((course) => course.category)))
}