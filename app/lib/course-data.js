const operatingSystemLessons = [
    {
        id: 1,
        title: "Introduction to Operating Systems",
        description: "Learn the fundamentals of operating systems and their role in computing",
        videoUrl: "https://www.youtube.com/embed/dI64JeCIO8k",
        documentation:
            "An operating system is system software that manages computer hardware, software resources, and provides common services for computer programs. It acts as an intermediary between users and the computer hardware.",
        quiz: {
            questions: [
                {
                    question: "What is the primary role of an operating system?",
                    options: [
                        "To manage hardware and provide services to applications",
                        "To run only one program at a time",
                        "To replace the BIOS",
                        "To store all user files permanently",
                    ],
                    correctAnswer: 0,
                },
                {
                    question: "Which of the following is NOT a function of an operating system?",
                    options: ["Memory management", "File management", "Hardware manufacturing", "Process scheduling"],
                    correctAnswer: 2,
                },
                {
                    question: "What does OS stand for?",
                    options: ["Open Source", "Operating System", "Output Server", "Online Software"],
                    correctAnswer: 1,
                },
                {
                    question: "Which layer sits between the user and the hardware?",
                    options: ["BIOS", "Operating System", "Application", "Network layer"],
                    correctAnswer: 1,
                },
                {
                    question: "Name three common operating systems.",
                    options: ["Windows, macOS, Linux", "Java, Python, C++", "Chrome, Firefox, Safari", "Word, Excel, PowerPoint"],
                    correctAnswer: 0,
                },
            ],
        },
    },
    {
        id: 2,
        title: "Process Management",
        description: "Understanding processes, threads, and scheduling",
        videoUrl: "https://www.youtube.com/embed/dI64JeCIO8k",
        documentation:
            "A process is a program in execution. The operating system manages multiple processes through scheduling algorithms like Round Robin, First Come First Served, and Priority Scheduling to ensure fair resource allocation.",
        quiz: {
            questions: [
                {
                    question: "What is a process?",
                    options: ["A thread of execution", "A program in execution", "A file on disk", "A hardware component"],
                    correctAnswer: 1,
                },
                {
                    question: "Which scheduling algorithm serves processes in the order they arrive?",
                    options: ["Priority Scheduling", "Round Robin", "First Come First Served", "Shortest Job First"],
                    correctAnswer: 2,
                },
                {
                    question: "What is the difference between a process and a program?",
                    options: [
                        "There is no difference",
                        "A process is a program in execution, while a program is stored code",
                        "A program is a process in execution",
                        "Programs run on disk, processes run in memory",
                    ],
                    correctAnswer: 1,
                },
                {
                    question: "What is context switching?",
                    options: [
                        "Changing the window focus",
                        "Saving and restoring process state",
                        "Moving data between memory and disk",
                        "Switching between threads",
                    ],
                    correctAnswer: 1,
                },
            ],
        },
    },
    {
        id: 3,
        title: "Memory Management",
        description: "Memory allocation and virtual memory concepts",
        videoUrl: "https://www.youtube.com/embed/dI64JeCIO8k",
        documentation:
            "Memory management is the process of allocating memory to programs and managing their release when they are no longer needed. Techniques include paging, segmentation, and virtual memory to handle memory efficiently.",
        quiz: {
            questions: [
                {
                    question: "What is virtual memory?",
                    options: [
                        "Memory that doesn't really exist",
                        "An extension of physical memory using disk space",
                        "Memory used by virtual machines",
                        "Memory allocated to background processes",
                    ],
                    correctAnswer: 1,
                },
                {
                    question: "What is paging?",
                    options: [
                        "Writing data to a printer",
                        "Dividing memory into equal-sized pages",
                        "Moving to the next page in a document",
                        "Numbering memory addresses",
                    ],
                    correctAnswer: 1,
                },
                {
                    question: "What is a page fault?",
                    options: [
                        "A memory chip failure",
                        "An error in the page file",
                        "When a required page is not in memory",
                        "A disk read error",
                    ],
                    correctAnswer: 2,
                },
                {
                    question: "Which memory technique divides memory into blocks of different sizes?",
                    options: ["Paging", "Segmentation", "Caching", "Buffering"],
                    correctAnswer: 1,
                },
            ],
        },
    },
    {
        id: 4,
        title: "File Systems",
        description: "File organization, storage management, and access methods",
        videoUrl: "https://www.youtube.com/embed/dI64JeCIO8k",
        documentation:
            "A file system is the method and data structure that the OS uses to keep track of files on a disk. It organizes files in a hierarchical directory structure and manages access permissions, file sizes, and storage locations.",
        quiz: {
            questions: [
                {
                    question: "What does a file system do?",
                    options: [
                        "Stores only important files",
                        "Organizes and tracks files on disk",
                        "Deletes unused files automatically",
                        "Encrypts all data on disk",
                    ],
                    correctAnswer: 1,
                },
                {
                    question: "What is a hierarchical directory structure?",
                    options: [
                        "A flat list of all files",
                        "Folders arranged like a tree with subdirectories",
                        "Files sorted by date",
                        "A database table of files",
                    ],
                    correctAnswer: 1,
                },
                {
                    question: "What does the inode store?",
                    options: ["File data", "File name only", "Metadata about a file", "Backup copies of files"],
                    correctAnswer: 2,
                },
                {
                    question: "What is fragmentation?",
                    options: [
                        "Breaking files into pieces",
                        "When data is scattered across the disk",
                        "File compression",
                        "Disk formatting",
                    ],
                    correctAnswer: 1,
                },
            ],
        },
    },
    {
        id: 5,
        title: "I/O Management",
        description: "Input/Output systems and device drivers",
        videoUrl: "https://www.youtube.com/embed/dI64JeCIO8k",
        documentation:
            "I/O management involves controlling and coordinating all the input/output devices connected to the computer. Device drivers are software programs that allow the OS to communicate with hardware devices.",
        quiz: {
            questions: [
                {
                    question: "What is the purpose of a device driver?",
                    options: [
                        "To control the CPU speed",
                        "To communicate between OS and hardware devices",
                        "To manage user accounts",
                        "To organize files",
                    ],
                    correctAnswer: 1,
                },
                {
                    question: "What does DMA stand for?",
                    options: [
                        "Direct Memory Access",
                        "Digital Memory Adapter",
                        "Data Management Architecture",
                        "Direct Module Address",
                    ],
                    correctAnswer: 0,
                },
                {
                    question: "What is a buffer in I/O operations?",
                    options: ["A protection shield", "Temporary storage area", "A type of cable", "A memory error"],
                    correctAnswer: 1,
                },
                {
                    question: "Which type of I/O is synchronous?",
                    options: [
                        "The program continues while I/O happens",
                        "The program waits for I/O to complete",
                        "The I/O happens in background",
                        "No synchronous I/O exists",
                    ],
                    correctAnswer: 1,
                },
            ],
        },
    },
    {
        id: 6,
        title: "Concurrency & Synchronization",
        description: "Managing concurrent processes and preventing race conditions",
        videoUrl: "https://www.youtube.com/embed/dI64JeCIO8k",
        documentation:
            "Concurrency is when multiple processes run at the same time. Synchronization mechanisms like semaphores, mutexes, and monitors ensure that multiple processes access shared resources safely without race conditions.",
        quiz: {
            questions: [
                {
                    question: "What is a race condition?",
                    options: [
                        "When processes run too fast",
                        "When multiple processes access shared data without synchronization",
                        "When a process crashes",
                        "When the CPU overheats",
                    ],
                    correctAnswer: 1,
                },
                {
                    question: "What is a semaphore?",
                    options: [
                        "A warning signal",
                        "A flag used for signaling between processes",
                        "A synchronization primitive that controls access to resources",
                        "A type of mutex",
                    ],
                    correctAnswer: 2,
                },
                {
                    question: "What does mutex stand for?",
                    options: ["Multiple execution", "Memory utility", "Mutual exclusion", "Multi-threading extension"],
                    correctAnswer: 2,
                },
                {
                    question: "What is a deadlock?",
                    options: [
                        "When a process is slow",
                        "When two or more processes are waiting for each other indefinitely",
                        "When memory runs out",
                        "When a file is corrupted",
                    ],
                    correctAnswer: 1,
                },
            ],
        },
    },
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