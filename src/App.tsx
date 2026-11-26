import {
  AlertCircle,
  Award,
  BarChart2,
  Bookmark,
  BookOpen,
  Brain,
  Check,
  CheckCircle,
  CheckSquare,
  ChevronRight,
  Clock,
  Eye,
  FileText,
  Flame,
  GraduationCap,
  HelpCircle,
  Layers,
  Lightbulb,
  Play,
  Plus,
  Printer,
  RefreshCw,
  Search,
  Sparkles,
  Star,
  Target,
  Trash2,
  TrendingUp,
  User,
  UserCheck,
  X,
} from 'lucide-react';
import { useEffect, useEffectEvent, useMemo, useState } from 'react';
import type { SubmitEvent } from 'react';

// --- INITIAL MOCK DATA ---

const INITIAL_SUBJECTS = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: '📐',
    color: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'science',
    name: 'General Science',
    icon: '🔬',
    color: 'from-blue-500 to-indigo-600',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'english',
    name: 'English Grammar & Comp',
    icon: '📚',
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-100 text-amber-800',
  },
  {
    id: 'bgs',
    name: 'Bangladesh & Global Studies',
    icon: '🌏',
    color: 'from-rose-500 to-pink-600',
    badgeColor: 'bg-rose-100 text-rose-800',
  },
  {
    id: 'ict',
    name: 'ICT & Computing',
    icon: '💻',
    color: 'from-cyan-500 to-blue-600',
    badgeColor: 'bg-cyan-100 text-cyan-800',
  },
];

const INITIAL_QUIZZES = [
  {
    id: 'q-101',
    title: 'Algebraic Expressions & Identities',
    subject: 'math',
    grade: 'Class 8',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    xpReward: 120,
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: 'What is the expanded form of (a + b)²?',
        options: ['a² + b²', 'a² + 2ab + b²', 'a² - 2ab + b²', '2a + 2b'],
        correctIndex: 1,
        explanation:
          'According to the basic algebraic identity, (a + b)² = (a + b)(a + b) = a² + ab + ba + b² = a² + 2ab + b².',
      },
      {
        id: 2,
        question: 'If x + 1/x = 4, what is the value of x² + 1/x²?',
        options: ['14', '16', '12', '18'],
        correctIndex: 0,
        explanation:
          'Squaring both sides: (x + 1/x)² = 4² => x² + 2(x)(1/x) + 1/x² = 16 => x² + 1/x² = 16 - 2 = 14.',
      },
      {
        id: 3,
        question: 'Factorize: x² - 9y²',
        options: [
          '(x - 3y)(x - 3y)',
          '(x + 3y)(x - 3y)',
          '(x + 9y)(x - y)',
          '(x² - 3y)',
        ],
        correctIndex: 1,
        explanation:
          'Using the difference of squares formula: a² - b² = (a + b)(a - b). Here 9y² = (3y)², so x² - (3y)² = (x + 3y)(x - 3y).',
      },
      {
        id: 4,
        question: 'What is the degree of the polynomial 4x³y² + 7x²y⁴ - 5?',
        options: ['3', '5', '6', '4'],
        correctIndex: 2,
        explanation:
          'The degree of a term with multiple variables is the sum of exponents. 4x³y² degree is 3+2=5; 7x²y⁴ degree is 2+4=6. Highest degree term is 6.',
      },
      {
        id: 5,
        question: 'Which of the following is a monomial?',
        options: ['5x + 3', '-12x²y', 'x² - y²', 'a + b + c'],
        correctIndex: 1,
        explanation:
          'A monomial consists of only one non-zero term with product of constants and non-negative integer powers of variables. -12x²y is a single term.',
      },
    ],
  },
  {
    id: 'q-102',
    title: 'Photosynthesis & Plant Ecosystems',
    subject: 'science',
    grade: 'Class 8',
    timeLimitMinutes: 8,
    totalQuestions: 4,
    xpReward: 100,
    difficulty: 'Easy',
    questions: [
      {
        id: 1,
        question:
          'Which organelle is responsible for photosynthesis in plant cells?',
        options: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Golgi Body'],
        correctIndex: 1,
        explanation:
          'Chloroplasts contain green chlorophyll pigments that absorb light energy to synthesize glucose from CO₂ and H₂O.',
      },
      {
        id: 2,
        question:
          'What is the primary gas absorbed by green plants during daytime photosynthesis?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Methane'],
        correctIndex: 1,
        explanation:
          'Plants absorb Carbon Dioxide (CO₂) through stomata during photosynthesis and release Oxygen (O₂).',
      },
      {
        id: 3,
        question:
          'Which component of the plant transports water from roots to leaves?',
        options: ['Phloem', 'Xylem', 'Epidermis', 'Stomata'],
        correctIndex: 1,
        explanation:
          'Xylem tissues carry water and dissolved minerals upwards from roots, while Phloem transports food prepared by leaves.',
      },
      {
        id: 4,
        question:
          'What byproduct of photosynthesis is essential for human respiration?',
        options: ['Carbon Dioxide', 'Glucose', 'Oxygen', 'Water vapor'],
        correctIndex: 2,
        explanation:
          'Oxygen (O₂) produced as a byproduct of photosynthesis is vital for cellular respiration in aerobic organisms including humans.',
      },
    ],
  },
  {
    id: 'q-103',
    title: 'Computer Networking & Internet Fundamentals',
    subject: 'ict',
    grade: 'Class 8',
    timeLimitMinutes: 10,
    totalQuestions: 4,
    xpReward: 110,
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: 'What does IP stand for in network communications?',
        options: [
          'Internal Protocol',
          'Internet Protocol',
          'Interconnected Provider',
          'Information Process',
        ],
        correctIndex: 1,
        explanation:
          'IP stands for Internet Protocol, which provides unique addressing for devices connected on a network.',
      },
      {
        id: 2,
        question:
          'Which topology connects all devices to a single central hub or switch?',
        options: [
          'Bus Topology',
          'Star Topology',
          'Ring Topology',
          'Mesh Topology',
        ],
        correctIndex: 1,
        explanation:
          'In a Star Topology, all peripheral nodes are connected to a central connection device (Hub/Switch).',
      },
      {
        id: 3,
        question:
          'Which network type covers a small area like a school computer lab?',
        options: [
          'WAN (Wide Area Network)',
          'LAN (Local Area Network)',
          'MAN (Metropolitan Area Network)',
          'PAN (Personal Area Network)',
        ],
        correctIndex: 1,
        explanation:
          'LAN (Local Area Network) is designed for limited geographical areas like homes, offices, or school classrooms.',
      },
      {
        id: 4,
        question:
          'What device converts digital computer signals to analog signals for telephone lines?',
        options: ['Router', 'Modem', 'Switch', 'Repeater'],
        correctIndex: 1,
        explanation:
          'Modem (Modulator-Demodulator) converts digital signals from computer to analog for transmission and vice-versa.',
      },
    ],
  },
  {
    id: 'q-104',
    title: 'NCTB English: Right Form of Verbs',
    subject: 'english',
    grade: 'Class 8',
    timeLimitMinutes: 7,
    totalQuestions: 4,
    xpReward: 90,
    difficulty: 'Easy',
    questions: [
      {
        id: 1,
        question: 'Complete sentence: "Slow and steady ___ the race."',
        options: ['win', 'wins', 'winning', 'has won'],
        correctIndex: 1,
        explanation:
          'When two singular subjects combined by "and" express a single idea, they take a singular verb ("wins").',
      },
      {
        id: 2,
        question: 'Identify the correct sentence using "had better":',
        options: [
          'He had better to go now.',
          'He had better go now.',
          'He had better gone now.',
          'He had better going now.',
        ],
        correctIndex: 1,
        explanation:
          '"Had better" is followed by a bare infinitive (verb base form without "to").',
      },
      {
        id: 3,
        question: 'Neither of the boys ___ present yesterday.',
        options: ['were', 'was', 'are', 'have been'],
        correctIndex: 1,
        explanation:
          '"Neither of" takes a singular verb. Since it refers to past time ("yesterday"), the singular past verb "was" is correct.',
      },
      {
        id: 4,
        question: 'It has been raining since morning. Which tense is used?',
        options: [
          'Present Continuous',
          'Present Perfect',
          'Present Perfect Continuous',
          'Past Perfect',
        ],
        correctIndex: 2,
        explanation:
          'Action started in past and still continuing uses Present Perfect Continuous Tense (has/have + been + verb-ing).',
      },
    ],
  },
];

const INITIAL_MATERIALS = [
  {
    id: 'm-1',
    subject: 'math',
    grade: 'Class 8',
    type: 'Formula Sheet',
    title: 'Algebraic Identities Quick Summary',
    readTime: '5 min read',
    summary:
      'Master all key algebraic formulas for NCTB Class 8 Mathematics exams including square and cube expansions.',
    content: `Key Identities:
1. (a + b)² = a² + 2ab + b²
2. (a - b)² = a² - 2ab + b²
3. a² - b² = (a + b)(a - b)
4. (x + a)(x + b) = x² + (a + b)x + ab
5. a² + b² = (a + b)² - 2ab = (a - b)² + 2ab
6. (a + b + c)² = a² + b² + c² + 2ab + 2bc + 2ca`,
    keyPoints: [
      'Memorize difference of squares for fast factorization.',
      'Watch out for sign inversion in (a - b)².',
    ],
    isBookmarked: true,
    isCompleted: true,
  },
  {
    id: 'm-2',
    subject: 'science',
    grade: 'Class 8',
    type: 'Chapter Summary',
    title: 'Light & Optical Instruments Overview',
    readTime: '7 min read',
    summary:
      'Comprehensive notes on reflection, refraction, lenses, and human eye structure.',
    content: `Refraction of Light:
When light travels from one transparent medium to another of different optical density, it bends at the boundary.
- Dense to Rare medium: Bends away from normal.
- Rare to Dense medium: Bends towards normal.

Lenses:
- Convex (Converging): Thicker at center, real and virtual images.
- Concave (Diverging): Thinner at center, forms virtual erect diminished images.`,
    keyPoints: [
      'Refractive index = speed of light in vacuum / speed in medium.',
      'Convex lens is used in correcting Hypermetropia (far-sightedness).',
    ],
    isBookmarked: false,
    isCompleted: false,
  },
  {
    id: 'm-3',
    subject: 'ict',
    grade: 'Class 8',
    type: 'Notes',
    title: 'Network Topologies Comparison Cheat Sheet',
    readTime: '4 min read',
    summary:
      'Visual comparison of Bus, Star, Ring, Mesh, and Tree network configurations with pros and cons.',
    content: `1. Star Topology: Central hub/switch. Easy to add nodes. If hub fails, network drops.
2. Bus Topology: Single backbone cable. Low cost, but cable damage breaks entire network.
3. Ring Topology: Token passing circle. Equal access, difficult to troubleshoot.
4. Mesh Topology: Every node connected to every other node. Extremely redundant and secure, but high cost.`,
    keyPoints: [
      'Star topology is the most common in modern school labs.',
      'Mesh topology provides maximum fault tolerance.',
    ],
    isBookmarked: true,
    isCompleted: false,
  },
  {
    id: 'm-4',
    subject: 'bgs',
    grade: 'Class 8',
    type: 'Chapter Summary',
    title: 'Liberation War of Bangladesh 1971',
    readTime: '10 min read',
    summary:
      'Key historical events, 11 Sectors, Mujibnagar Government, and December 16 Victory.',
    content: `Key Milestones:
- March 7, 1971: Historic speech by Bangabandhu Sheikh Mujibur Rahman.
- March 26, 1971: Declaration of Independence & Operation Searchlight resistance.
- April 17, 1971: Formation of Mujibnagar Provisional Government at Baidyanathtala.
- 11 Sectors: Bangladesh divided into 11 military sectors under Commander-in-Chief General M. A. G. Osmani.
- December 16, 1971: Surrender of Pakistani forces at Racecourse Maidan; birth of independent Bangladesh.`,
    keyPoints: [
      'Sector 10 was the naval sector with no fixed geographical boundary.',
      'Mujibnagar Govt oath was taken on April 17, 1971.',
    ],
    isBookmarked: false,
    isCompleted: true,
  },
];

const INITIAL_STUDENT_ROSTER = [
  {
    id: 'st-01',
    name: 'Rafiqul Islam',
    roll: 14,
    grade: 'Class 8 - Sec A',
    quizzesCompleted: 6,
    avgScore: 88,
    attendance: '96%',
    strengths: ['Mathematics', 'ICT'],
    weaknesses: ['English Grammar'],
    recentQuiz: 'Algebraic Expressions (90%)',
    badge: 'Top Mathlete',
  },
  {
    id: 'st-02',
    name: 'Nusrat Jahan',
    roll: 3,
    grade: 'Class 8 - Sec A',
    quizzesCompleted: 8,
    avgScore: 94,
    attendance: '98%',
    strengths: ['Science', 'English'],
    weaknesses: ['Bangladesh Studies'],
    recentQuiz: 'Photosynthesis (100%)',
    badge: 'Class Topper',
  },
  {
    id: 'st-03',
    name: 'Tanvir Hasan',
    roll: 22,
    grade: 'Class 8 - Sec A',
    quizzesCompleted: 4,
    avgScore: 72,
    attendance: '89%',
    strengths: ['ICT'],
    weaknesses: ['Mathematics', 'Science'],
    recentQuiz: 'Computer Networks (75%)',
    badge: 'Rising Star',
  },
  {
    id: 'st-04',
    name: 'Sadia Chowdhury',
    roll: 7,
    grade: 'Class 8 - Sec A',
    quizzesCompleted: 7,
    avgScore: 85,
    attendance: '94%',
    strengths: ['English', 'BGS'],
    weaknesses: ['Algebra'],
    recentQuiz: 'Right Form of Verbs (92%)',
    badge: 'Consistent Learner',
  },
  {
    id: 'st-05',
    name: 'Abrar Rahman',
    roll: 18,
    grade: 'Class 8 - Sec A',
    quizzesCompleted: 5,
    avgScore: 68,
    attendance: '85%',
    strengths: ['BGS'],
    weaknesses: ['Math Equations', 'ICT'],
    recentQuiz: 'Algebraic Expressions (60%)',
    badge: 'Needs Review',
  },
];

type Role = 'student' | 'teacher';
type Quiz = (typeof INITIAL_QUIZZES)[number];
type QuizQuestion = Quiz['questions'][number];
type QuizDraft = Omit<Quiz, 'id' | 'totalQuestions' | 'timeLimitMinutes'> & {
  timeLimitMinutes: number | '';
};
type QuizResult = {
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  earnedXP: number;
  passed: boolean;
};
type StudyMaterial = (typeof INITIAL_MATERIALS)[number];
type StudentReport = (typeof INITIAL_STUDENT_ROSTER)[number];

// Main App Component
export default function App() {
  // Role State: 'student' | 'teacher'
  const [role, setRole] = useState<Role>('student');

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard'); // student: dashboard, quizzes, library, analytics | teacher: teacher-dashboard, quiz-creator, reports

  // Core App Data States
  const [quizzes, setQuizzes] = useState(INITIAL_QUIZZES);
  const [studyMaterials, setStudyMaterials] = useState(INITIAL_MATERIALS);

  // Student Profile State
  const [studentProfile, setStudentProfile] = useState({
    name: 'Rafiqul Islam',
    grade: 'Class 8',
    rollNo: 14,
    school: 'Dhaka Collegiate School',
    xp: 1350,
    streak: 6,
    level: 4,
    badgesCount: 5,
    completedMaterialsCount: 2,
    history: [
      {
        id: 'h-1',
        quizTitle: 'Algebraic Expressions & Identities',
        subject: 'math',
        score: 4,
        total: 5,
        percentage: 80,
        date: 'Yesterday',
      },
      {
        id: 'h-2',
        quizTitle: 'Photosynthesis & Plant Ecosystems',
        subject: 'science',
        score: 4,
        total: 4,
        percentage: 100,
        date: '3 days ago',
      },
      {
        id: 'h-3',
        quizTitle: 'NCTB English: Right Form of Verbs',
        subject: 'english',
        score: 3,
        total: 4,
        percentage: 75,
        date: '5 days ago',
      },
    ],
  });

  // Teacher Profile State
  const teacherProfile = {
    name: 'Farhana Yasmin',
    designation: 'Senior Science & Math Teacher',
    school: 'Dhaka Collegiate School',
    assignedClass: 'Class 8 (Section A & B)',
    activeAssessments: quizzes.length,
    totalStudents: 45,
  };

  // --- QUIZ ENGINE STATES ---
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null); // quiz object when taking quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Partial<Record<QuizQuestion['id'], number>>
  >({});
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [quizScoreResult, setQuizScoreResult] = useState<QuizResult | null>(null);

  // --- STUDY LIBRARY STATES ---
  const [librarySearch, setLibrarySearch] = useState('');
  const [librarySubjectFilter, setLibrarySubjectFilter] = useState('all');
  const [activeMaterialModal, setActiveMaterialModal] =
    useState<StudyMaterial | null>(null);

  // --- TEACHER QUIZ CREATOR STATE ---
  const [newQuiz, setNewQuiz] = useState<QuizDraft>({
    title: '',
    subject: 'math',
    grade: 'Class 8',
    timeLimitMinutes: 10,
    xpReward: 100,
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        explanation: '',
      },
    ],
  });
  const [creatorSuccessMessage, setCreatorSuccessMessage] = useState('');

  // --- REPORT CARD MODAL STATE ---
  const [selectedStudentReport, setSelectedStudentReport] =
    useState<StudentReport | null>(null);

  // Toast / Banner Message
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Switch role reset
  const handleRoleSwitch = (newRole: Role) => {
    setRole(newRole);
    if (newRole === 'teacher') {
      setActiveTab('teacher-dashboard');
    } else {
      setActiveTab('dashboard');
    }
  };

  // Start Quiz Handler
  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimerSeconds(quiz.timeLimitMinutes * 60);
    setQuizScoreResult(null);
  };

  // Answer Select Handler
  const handleAnswerSelect = (qId: QuizQuestion['id'], optionIdx: number) => {
    if (quizScoreResult) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionIdx,
    }));
  };

  // Submit Quiz Handler
  const handleQuizSubmit = () => {
    if (!activeQuiz || quizScoreResult) return;

    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round(
      (correctCount / activeQuiz.totalQuestions) * 100,
    );
    const earnedXP = Math.round((percentage / 100) * activeQuiz.xpReward);

    const result = {
      correctCount,
      totalQuestions: activeQuiz.totalQuestions,
      percentage,
      earnedXP,
      passed: percentage >= 60,
    };

    setQuizScoreResult(result);

    // Update Student Profile XP & History
    setStudentProfile((prev) => {
      const newXp = prev.xp + earnedXP;
      const newStreak = prev.streak + (percentage >= 60 ? 1 : 0);
      const newHistoryItem = {
        id: 'h-' + Date.now(),
        quizTitle: activeQuiz.title,
        subject: activeQuiz.subject,
        score: correctCount,
        total: activeQuiz.totalQuestions,
        percentage,
        date: 'Just now',
      };
      return {
        ...prev,
        xp: newXp,
        streak: newStreak,
        history: [newHistoryItem, ...prev.history],
      };
    });

    showNotification(`🎉 Quiz Completed! You earned +${earnedXP} XP!`);
  };

  const submitExpiredQuiz = useEffectEvent(handleQuizSubmit);

  useEffect(() => {
    if (!activeQuiz || quizScoreResult || timerSeconds <= 0) return;

    const timeout = setTimeout(() => {
      setTimerSeconds(timerSeconds - 1);
      if (timerSeconds === 1) submitExpiredQuiz();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [activeQuiz, quizScoreResult, timerSeconds]);

  // Exit Quiz
  const handleExitQuiz = () => {
    setActiveQuiz(null);
    setSelectedAnswers({});
    setQuizScoreResult(null);
  };

  // Format Timer mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Bookmark / Complete Toggle Study Material
  const toggleMaterialBookmark = (id: StudyMaterial['id']) => {
    setStudyMaterials((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item,
      ),
    );
  };

  const toggleMaterialCompleted = (id: StudyMaterial['id']) => {
    setStudyMaterials((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.isCompleted;
          if (nextState) {
            setStudentProfile((sp) => ({
              ...sp,
              xp: sp.xp + 50,
              completedMaterialsCount: sp.completedMaterialsCount + 1,
            }));
            showNotification('🌟 Completed study note! +50 XP gained!');
          }
          return { ...item, isCompleted: nextState };
        }
        return item;
      }),
    );
  };

  // --- TEACHER: Add Question to New Quiz ---
  const handleAddQuestionToNewQuiz = () => {
    setNewQuiz((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: prev.questions.length + 1,
          question: '',
          options: ['', '', '', ''],
          correctIndex: 0,
          explanation: '',
        },
      ],
    }));
  };

  const handleRemoveQuestionFromNewQuiz = (index: number) => {
    if (newQuiz.questions.length <= 1) return;
    setNewQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleQuestionChange = <
    Field extends 'question' | 'correctIndex' | 'explanation',
  >(
    index: number,
    field: Field,
    value: QuizQuestion[Field],
  ) => {
    setNewQuiz((prev) => {
      const updatedQs = [...prev.questions];
      updatedQs[index] = { ...updatedQs[index], [field]: value };
      return { ...prev, questions: updatedQs };
    });
  };

  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    setNewQuiz((prev) => {
      const updatedQs = [...prev.questions];
      const newOpts = [...updatedQs[qIndex].options];
      newOpts[optIndex] = value;
      updatedQs[qIndex] = { ...updatedQs[qIndex], options: newOpts };
      return { ...prev, questions: updatedQs };
    });
  };

  // Teacher: Save & Publish New Assessment
  const handlePublishAssessment = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newQuiz.timeLimitMinutes === '') return;
    if (!newQuiz.title.trim()) {
      alert('Please provide a quiz title.');
      return;
    }

    const createdQuiz: Quiz = {
      id: 'q-' + (quizzes.length + 101),
      title: newQuiz.title,
      subject: newQuiz.subject,
      grade: newQuiz.grade,
      timeLimitMinutes: newQuiz.timeLimitMinutes,
      totalQuestions: newQuiz.questions.length,
      xpReward: Number(newQuiz.xpReward),
      difficulty: newQuiz.difficulty,
      questions: newQuiz.questions.map((q, idx) => ({
        ...q,
        id: idx + 1,
      })),
    };

    setQuizzes([createdQuiz, ...quizzes]);
    setCreatorSuccessMessage(
      'Assessment published successfully! It is now live in the Student Portal.',
    );

    // Reset Form
    setNewQuiz({
      title: '',
      subject: 'math',
      grade: 'Class 8',
      timeLimitMinutes: 10,
      xpReward: 100,
      difficulty: 'Medium',
      questions: [
        {
          id: 1,
          question: '',
          options: ['', '', '', ''],
          correctIndex: 0,
          explanation: '',
        },
      ],
    });

    setTimeout(() => {
      setCreatorSuccessMessage('');
      handleRoleSwitch('student');
      setActiveTab('quizzes');
      showNotification('🎓 Switched to Student View to test your new Quiz!');
    }, 1800);
  };

  // Filtered Study Materials
  const filteredMaterials = useMemo(() => {
    return studyMaterials.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
        item.summary.toLowerCase().includes(librarySearch.toLowerCase());
      const matchesSubject =
        librarySubjectFilter === 'all' || item.subject === librarySubjectFilter;
      return matchesSearch && matchesSubject;
    });
  }, [studyMaterials, librarySearch, librarySubjectFilter]);

  // Subject helper
  const getSubjectInfo = (subjectId: Quiz['subject']) => {
    return (
      INITIAL_SUBJECTS.find((s) => s.id === subjectId) || INITIAL_SUBJECTS[0]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-emerald-200">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-700 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-emerald-500 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span className="font-medium text-sm">{notification}</span>
        </div>
      )}

      {/* TOP BAR / NAVIGATION HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 text-white p-2.5 rounded-xl shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl tracking-tight text-slate-900">
                  Shikkha<span className="text-emerald-600">Bondhu</span>
                </span>
                <span className="text-[10px] font-bold tracking-wider bg-emerald-100 text-emerald-800 uppercase px-2 py-0.5 rounded-full">
                  NCTB Grades 6-10
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Interactive E-Learning & Assessment Platform
              </p>
            </div>
          </div>

          {/* Quick Stats & Role Switcher */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Student Stats (Visible when in student mode) */}
            {role === 'student' && (
              <div className="hidden md:flex items-center space-x-4 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-semibold">
                <div
                  className="flex items-center space-x-1.5 text-amber-600"
                  title="Daily Streak"
                >
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
                  <span>{studentProfile.streak} Days Streak</span>
                </div>
                <div className="h-3 w-px bg-slate-300"></div>
                <div
                  className="flex items-center space-x-1.5 text-emerald-700"
                  title="XP Score"
                >
                  <Star className="w-4 h-4 fill-emerald-500 text-emerald-600" />
                  <span>
                    {studentProfile.xp} XP (Lvl {studentProfile.level})
                  </span>
                </div>
              </div>
            )}

            {/* ROLE SWITCHER TOGGLE PILL */}
            <div className="bg-slate-200 p-1 rounded-xl flex items-center text-xs font-semibold">
              <button
                onClick={() => handleRoleSwitch('student')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  role === 'student'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Student View</span>
              </button>
              <button
                onClick={() => handleRoleSwitch('teacher')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  role === 'teacher'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Teacher View</span>
              </button>
            </div>

            {/* Profile Avatar Badge */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {role === 'student' ? 'RI' : 'FY'}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold leading-tight text-slate-800">
                  {role === 'student'
                    ? studentProfile.name
                    : teacherProfile.name}
                </p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  {role === 'student'
                    ? `${studentProfile.grade} • Roll ${studentProfile.rollNo}`
                    : 'Senior Educator'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SUB-HEADER / SECONDARY NAVIGATION */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto">
          <nav className="flex space-x-1 py-2 min-w-max">
            {role === 'student' ? (
              <>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'dashboard'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab('quizzes')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'quizzes'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Target className="w-4 h-4" />
                  <span>Practice Quizzes</span>
                  <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                    {quizzes.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('library')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'library'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Study Library</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'analytics'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>Academic Analytics</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('teacher-dashboard')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'teacher-dashboard'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Class Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('quiz-creator')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'quiz-creator'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Assessment</span>
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'reports'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Student Report Cards</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* MAIN CONTAINER CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* ========================================================= */}
        {/* ACTIVE QUIZ PLAYER OVERLAY / MODE (STUDENT)              */}
        {/* ========================================================= */}
        {activeQuiz ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden max-w-4xl mx-auto">
            {/* Quiz Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  {getSubjectInfo(activeQuiz.subject).name} • {activeQuiz.grade}
                </span>
                <h2 className="text-xl font-bold">{activeQuiz.title}</h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-lg font-bold text-amber-400">
                    {formatTime(timerSeconds)}
                  </span>
                </div>
                <button
                  onClick={handleExitQuiz}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
                  title="Close Quiz"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Quiz Progress Bar */}
            <div className="w-full bg-slate-100 h-2">
              <div
                className="bg-emerald-500 h-2 transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / activeQuiz.totalQuestions) * 100}%`,
                }}
              ></div>
            </div>

            {/* Quiz Body */}
            {!quizScoreResult ? (
              <div className="p-6 md:p-8">
                {/* Question Navigator Pills */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-500">
                    Question {currentQuestionIndex + 1} of{' '}
                    {activeQuiz.totalQuestions}
                  </span>
                  <div className="flex space-x-2">
                    {activeQuiz.questions.map((q, idx) => (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                          currentQuestionIndex === idx
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                            : selectedAnswers[q.id] !== undefined
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Prompt */}
                {(() => {
                  const q = activeQuiz.questions[currentQuestionIndex];
                  return (
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-6">
                        {q.question}
                      </h3>

                      {/* Options */}
                      <div className="space-y-3 mb-8">
                        {q.options.map((option, optIdx) => {
                          const isSelected = selectedAnswers[q.id] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerSelect(q.id, optIdx)}
                              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold shadow-sm'
                                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <span
                                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                    isSelected
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{option}</span>
                              </div>
                              {isSelected && (
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Controls Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <button
                          onClick={() =>
                            setCurrentQuestionIndex((prev) =>
                              Math.max(0, prev - 1),
                            )
                          }
                          disabled={currentQuestionIndex === 0}
                          className="px-4 py-2 rounded-lg font-semibold text-sm border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                        >
                          Previous
                        </button>

                        {currentQuestionIndex <
                        activeQuiz.totalQuestions - 1 ? (
                          <button
                            onClick={() =>
                              setCurrentQuestionIndex((prev) => prev + 1)
                            }
                            className="bg-slate-900 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-all flex items-center space-x-2"
                          >
                            <span>Next Question</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={handleQuizSubmit}
                            className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-emerald-700 transition-all shadow-md flex items-center space-x-2"
                          >
                            <CheckSquare className="w-4 h-4" />
                            <span>Submit Quiz</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              /* Quiz Result & Review Screen */
              <div className="p-6 md:p-8">
                <div className="text-center max-w-md mx-auto mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                      quizScoreResult.passed
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-amber-100 text-amber-600'
                    }`}
                  >
                    {quizScoreResult.passed ? (
                      <Award className="w-8 h-8" />
                    ) : (
                      <AlertCircle className="w-8 h-8" />
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">
                    {quizScoreResult.passed ? 'Great Job!' : 'Keep Practicing!'}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    You scored {quizScoreResult.correctCount} out of{' '}
                    {quizScoreResult.totalQuestions} (
                    {quizScoreResult.percentage}%)
                  </p>

                  <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>
                      +{quizScoreResult.earnedXP} XP Added to Profile!
                    </span>
                  </div>
                </div>

                {/* Detailed Explanations */}
                <h4 className="font-bold text-slate-800 text-lg mb-4 flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <span>Question Review & Explanations</span>
                </h4>

                <div className="space-y-4 mb-8">
                  {activeQuiz.questions.map((q, idx) => {
                    const userAns = selectedAnswers[q.id];
                    const isCorrect = userAns === q.correctIndex;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border ${
                          isCorrect
                            ? 'border-emerald-200 bg-emerald-50/50'
                            : 'border-rose-200 bg-rose-50/50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-bold text-slate-800 text-sm">
                            Q{idx + 1}. {q.question}
                          </span>
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        </div>
                        <div className="text-xs space-y-1 text-slate-700 mb-3">
                          <p>
                            <strong className="text-slate-900">
                              Your Answer:
                            </strong>{' '}
                            {userAns !== undefined
                              ? q.options[userAns]
                              : 'Not Answered'}
                          </p>
                          {!isCorrect && (
                            <p className="text-emerald-700">
                              <strong className="text-emerald-900">
                                Correct Answer:
                              </strong>{' '}
                              {q.options[q.correctIndex]}
                            </p>
                          )}
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-600">
                          <span className="font-semibold text-slate-800">
                            Explanation:{' '}
                          </span>
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => handleStartQuiz(activeQuiz)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm hover:bg-slate-100 flex items-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retake Quiz</span>
                  </button>
                  <button
                    onClick={handleExitQuiz}
                    className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 shadow-md"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* ========================================================= */}
            {/* STUDENT PORTAL VIEWS                                      */}
            {/* ========================================================= */}
            {role === 'student' && (
              <>
                {/* --- STUDENT DASHBOARD --- */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-8">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
                      <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-8 -translate-y-8">
                        <GraduationCap className="w-96 h-96" />
                      </div>
                      <div className="relative z-10 max-w-2xl">
                        <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 mb-3">
                          Shubho Shokal / Welcome Back!
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                          Ready to ace your Class 8 NCTB exams,{' '}
                          {studentProfile.name}?
                        </h1>
                        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                          You have completed {studentProfile.history.length}{' '}
                          quizzes this week with a {studentProfile.streak}-day
                          active streak! Keep solving practice sets to level up.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => setActiveTab('quizzes')}
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center space-x-2"
                          >
                            <Play className="w-4 h-4 fill-slate-950" />
                            <span>Start Recommended Quiz</span>
                          </button>
                          <button
                            onClick={() => setActiveTab('library')}
                            className="bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center space-x-2"
                          >
                            <BookOpen className="w-4 h-4 text-emerald-400" />
                            <span>Browse Formula Sheets</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Performance Overview Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                          <Flame className="w-6 h-6 fill-amber-500" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase">
                            Active Streak
                          </p>
                          <p className="text-xl font-black text-slate-800">
                            {studentProfile.streak} Days
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                          <Star className="w-6 h-6 fill-emerald-500" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase">
                            Total XP Points
                          </p>
                          <p className="text-xl font-black text-slate-800">
                            {studentProfile.xp} XP
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase">
                            Badges Earned
                          </p>
                          <p className="text-xl font-black text-slate-800">
                            {studentProfile.badgesCount} Badges
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase">
                            Notes Completed
                          </p>
                          <p className="text-xl font-black text-slate-800">
                            {studentProfile.completedMaterialsCount} Materials
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Two-Column Section: Subject Mastery & Recommended Quizzes */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left 2 Cols: Subject Mastery Bars */}
                      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h2 className="font-bold text-lg text-slate-800">
                              Subject Mastery Progress
                            </h2>
                            <p className="text-xs text-slate-500">
                              Based on recent NCTB quiz submissions & practice
                            </p>
                          </div>
                          <button
                            onClick={() => setActiveTab('analytics')}
                            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
                          >
                            <span>Full Report</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-5">
                          {[
                            {
                              name: 'Mathematics',
                              score: 88,
                              icon: '📐',
                              color: 'bg-emerald-500',
                            },
                            {
                              name: 'General Science',
                              score: 94,
                              icon: '🔬',
                              color: 'bg-blue-500',
                            },
                            {
                              name: 'ICT & Computing',
                              score: 90,
                              icon: '💻',
                              color: 'bg-cyan-500',
                            },
                            {
                              name: 'English Grammar',
                              score: 75,
                              icon: '📚',
                              color: 'bg-amber-500',
                            },
                            {
                              name: 'Bangladesh & Global Studies',
                              score: 82,
                              icon: '🌏',
                              color: 'bg-rose-500',
                            },
                          ].map((subj, idx) => (
                            <div key={idx}>
                              <div className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-1.5">
                                <span className="flex items-center space-x-2">
                                  <span className="text-base">{subj.icon}</span>
                                  <span>{subj.name}</span>
                                </span>
                                <span className="font-bold text-slate-900">
                                  {subj.score}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                <div
                                  className={`${subj.color} h-3 rounded-full transition-all duration-500`}
                                  style={{ width: `${subj.score}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right 1 Col: Quick Recent History & Badges */}
                      <div className="space-y-6">
                        {/* Recent History Card */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                          <h3 className="font-bold text-slate-800 mb-4 text-base">
                            Recent Quiz Activity
                          </h3>
                          <div className="space-y-3">
                            {studentProfile.history.slice(0, 3).map((item) => (
                              <div
                                key={item.id}
                                className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs"
                              >
                                <div className="flex justify-between font-semibold text-slate-800 mb-1">
                                  <span className="truncate pr-2">
                                    {item.quizTitle}
                                  </span>
                                  <span className="text-emerald-600 font-bold">
                                    {item.percentage}%
                                  </span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                  <span>
                                    Score: {item.score}/{item.total}
                                  </span>
                                  <span>{item.date}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Badges Box */}
                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-2xl shadow-sm">
                          <div className="flex items-center space-x-3 mb-3">
                            <Award className="w-6 h-6 text-amber-200" />
                            <h3 className="font-bold text-lg">
                              Top Badges Unlocked
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                              🏆 Math Master
                            </span>
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                              ⚡ 5-Day Streak
                            </span>
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                              🔬 Lab Scholar
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- PRACTICE QUIZZES TAB --- */}
                {activeTab === 'quizzes' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                          Interactive Quiz Engine
                        </h1>
                        <p className="text-sm text-slate-500">
                          Test your knowledge with timed NCTB chapter
                          assessments.
                        </p>
                      </div>
                    </div>

                    {/* Quiz Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {quizzes.map((quiz) => {
                        const subj = getSubjectInfo(quiz.subject);
                        return (
                          <div
                            key={quiz.id}
                            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span
                                  className={`text-xs font-bold px-2.5 py-1 rounded-lg ${subj.badgeColor}`}
                                >
                                  {subj.icon} {subj.name}
                                </span>
                                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                                  {quiz.difficulty}
                                </span>
                              </div>

                              <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2">
                                {quiz.title}
                              </h3>

                              <div className="flex items-center space-x-4 text-xs font-medium text-slate-500 mb-6">
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{quiz.timeLimitMinutes} Mins</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <HelpCircle className="w-3.5 h-3.5" />
                                  <span>{quiz.totalQuestions} Questions</span>
                                </span>
                                <span className="flex items-center space-x-1 text-amber-600 font-bold">
                                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                                  <span>+{quiz.xpReward} XP</span>
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleStartQuiz(quiz)}
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2 text-sm"
                            >
                              <Play className="w-4 h-4 fill-white" />
                              <span>Attempt Quiz Now</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* --- STUDY LIBRARY TAB --- */}
                {activeTab === 'library' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900">
                        Digital Study Materials Library
                      </h1>
                      <p className="text-sm text-slate-500">
                        Access official NCTB formula sheets, summaries, and
                        revision notes.
                      </p>
                    </div>

                    {/* Search & Filters */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                      {/* Search input */}
                      <div className="relative w-full md:w-96">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Search formula sheets, notes..."
                          value={librarySearch}
                          onChange={(e) => setLibrarySearch(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      {/* Subject Pill Filters */}
                      <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                        <button
                          onClick={() => setLibrarySubjectFilter('all')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                            librarySubjectFilter === 'all'
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          All Subjects
                        </button>
                        {INITIAL_SUBJECTS.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setLibrarySubjectFilter(s.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                              librarySubjectFilter === s.id
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {s.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Materials Cards List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredMaterials.map((material) => {
                        const subj = getSubjectInfo(material.subject);
                        return (
                          <div
                            key={material.id}
                            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span
                                  className={`text-xs font-bold px-2.5 py-1 rounded-lg ${subj.badgeColor}`}
                                >
                                  {subj.icon} {subj.name} • {material.type}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() =>
                                      toggleMaterialBookmark(material.id)
                                    }
                                    className={`p-1.5 rounded-lg ${
                                      material.isBookmarked
                                        ? 'text-amber-500 bg-amber-50'
                                        : 'text-slate-400 hover:bg-slate-100'
                                    }`}
                                    title="Bookmark"
                                  >
                                    <Bookmark className="w-4 h-4 fill-current" />
                                  </button>
                                </div>
                              </div>

                              <h3 className="font-bold text-slate-900 text-lg mb-2">
                                {material.title}
                              </h3>
                              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                                {material.summary}
                              </p>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-xs text-slate-400 font-medium">
                                ⏱️ {material.readTime}
                              </span>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() =>
                                    toggleMaterialCompleted(material.id)
                                  }
                                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
                                    material.isCompleted
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>
                                    {material.isCompleted
                                      ? 'Completed'
                                      : 'Mark Done'}
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    setActiveMaterialModal(material)
                                  }
                                  className="bg-slate-900 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-1"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Read Notes</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* --- ACADEMIC ANALYTICS TAB --- */}
                {activeTab === 'analytics' && (
                  <div className="space-y-8">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900">
                        Academic Progress & Analytics
                      </h1>
                      <p className="text-sm text-slate-500">
                        Comprehensive breakdown of your subject scores and weak
                        areas.
                      </p>
                    </div>

                    {/* Stats Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-500 uppercase">
                            Average Quiz Score
                          </span>
                          <TrendingUp className="w-5 h-5 text-emerald-600" />
                        </div>
                        <p className="text-3xl font-black text-slate-900">
                          86.4%
                        </p>
                        <span className="text-xs text-emerald-600 font-semibold">
                          ↑ +4.2% from last week
                        </span>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-500 uppercase">
                            Quizzes Completed
                          </span>
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-3xl font-black text-slate-900">
                          {studentProfile.history.length}
                        </p>
                        <span className="text-xs text-slate-500">
                          Passed 100% of attempts
                        </span>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-500 uppercase">
                            Focus Weak Area
                          </span>
                          <AlertCircle className="w-5 h-5 text-amber-500" />
                        </div>
                        <p className="text-xl font-bold text-amber-600">
                          English Verb Forms
                        </p>
                        <span className="text-xs text-slate-500">
                          Recommended: 2 revision modules
                        </span>
                      </div>
                    </div>

                    {/* Weak Area Recommendation Box */}
                    <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-amber-500 text-white rounded-xl">
                          <Brain className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-amber-950 text-base">
                            Personalized Study Recommendation
                          </h3>
                          <p className="text-xs text-amber-800 max-w-xl mt-0.5">
                            Our AI analyzer detected slightly lower accuracy in{' '}
                            <strong>English Tenses & Verb Rules</strong> (75%).
                            Practice 1 quick quiz today to boost your mastery
                            score!
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const engQuiz =
                            quizzes.find((q) => q.subject === 'english') ||
                            quizzes[0];
                          handleStartQuiz(engQuiz);
                        }}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm whitespace-nowrap"
                      >
                        Practice English Now
                      </button>
                    </div>

                    {/* Historical Score History */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h3 className="font-bold text-slate-900 text-lg mb-4">
                        Quiz Score Log
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="border-b border-slate-200 text-xs text-slate-400 uppercase font-semibold">
                              <th className="py-3 px-4">Quiz Title</th>
                              <th className="py-3 px-4">Subject</th>
                              <th className="py-3 px-4">Score</th>
                              <th className="py-3 px-4">Percentage</th>
                              <th className="py-3 px-4">Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {studentProfile.history.map((h) => {
                              const subj = getSubjectInfo(h.subject);
                              return (
                                <tr key={h.id} className="hover:bg-slate-50">
                                  <td className="py-3 px-4 font-semibold text-slate-800">
                                    {h.quizTitle}
                                  </td>
                                  <td className="py-3 px-4">
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded font-semibold ${subj.badgeColor}`}
                                    >
                                      {subj.name}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-slate-600 font-medium">
                                    {h.score} / {h.total}
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className="font-bold text-emerald-600">
                                      {h.percentage}%
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-xs text-slate-400">
                                    {h.date}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ========================================================= */}
            {/* TEACHER PORTAL VIEWS                                      */}
            {/* ========================================================= */}
            {role === 'teacher' && (
              <>
                {/* --- TEACHER DASHBOARD --- */}
                {activeTab === 'teacher-dashboard' && (
                  <div className="space-y-8">
                    {/* Teacher Header */}
                    <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 mb-2 inline-block">
                          Educator Workspace • {teacherProfile.assignedClass}
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-black">
                          Welcome, {teacherProfile.name}!
                        </h1>
                        <p className="text-slate-300 text-xs sm:text-sm mt-1">
                          Manage student assessments, view analytics, and
                          generate report cards for Class 8.
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveTab('quiz-creator')}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center space-x-2 transition-all whitespace-nowrap"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Create New Assessment</span>
                      </button>
                    </div>

                    {/* Class Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-xs font-semibold text-slate-500 uppercase">
                          Class Average
                        </span>
                        <p className="text-2xl font-black text-slate-900 mt-1">
                          81.4%
                        </p>
                        <span className="text-xs text-emerald-600 font-medium">
                          Class 8 Sec A
                        </span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-xs font-semibold text-slate-500 uppercase">
                          Active Students
                        </span>
                        <p className="text-2xl font-black text-slate-900 mt-1">
                          45 / 45
                        </p>
                        <span className="text-xs text-slate-500">
                          100% submission rate
                        </span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-xs font-semibold text-slate-500 uppercase">
                          Published Quizzes
                        </span>
                        <p className="text-2xl font-black text-slate-900 mt-1">
                          {quizzes.length} Quizzes
                        </p>
                        <span className="text-xs text-emerald-600 font-medium">
                          Live on Student Portal
                        </span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-xs font-semibold text-slate-500 uppercase">
                          Top Performer
                        </span>
                        <p className="text-lg font-bold text-slate-900 mt-1">
                          Nusrat Jahan
                        </p>
                        <span className="text-xs text-emerald-600 font-semibold">
                          94% Average
                        </span>
                      </div>
                    </div>

                    {/* Recent Activity Feed */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h3 className="font-bold text-slate-900 text-lg mb-4">
                        Recent Student Submissions
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            name: 'Rafiqul Islam',
                            quiz: 'Algebraic Expressions & Identities',
                            score: '80%',
                            time: '10 mins ago',
                            status: 'Passed',
                          },
                          {
                            name: 'Nusrat Jahan',
                            quiz: 'Photosynthesis & Plant Ecosystems',
                            score: '100%',
                            time: '45 mins ago',
                            status: 'Excellent',
                          },
                          {
                            name: 'Tanvir Hasan',
                            quiz: 'Computer Networking & Internet',
                            score: '75%',
                            time: '2 hours ago',
                            status: 'Passed',
                          },
                          {
                            name: 'Sadia Chowdhury',
                            quiz: 'Right Form of Verbs',
                            score: '92%',
                            time: '3 hours ago',
                            status: 'Excellent',
                          },
                        ].map((activity, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                                {activity.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-800">
                                  {activity.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {activity.quiz}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-extrabold text-sm text-emerald-700">
                                {activity.score}
                              </span>
                              <p className="text-[11px] text-slate-400">
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- CUSTOM ASSESSMENT CREATOR --- */}
                {activeTab === 'quiz-creator' && (
                  <div className="space-y-6 max-w-4xl mx-auto">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900">
                        Create Custom Assessment
                      </h1>
                      <p className="text-sm text-slate-500">
                        Design a new quiz for your students. Once published, it
                        immediately appears in the Student Portal!
                      </p>
                    </div>

                    {creatorSuccessMessage && (
                      <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 p-4 rounded-xl font-bold text-sm flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span>{creatorSuccessMessage}</span>
                      </div>
                    )}

                    <form
                      onSubmit={handlePublishAssessment}
                      className="space-y-6"
                    >
                      {/* Basic Info Card */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-slate-900 text-base pb-2 border-b border-slate-100">
                          Assessment Details
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                              Quiz Title
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Class 8 Math: Linear Equations Practice"
                              value={newQuiz.title}
                              onChange={(e) =>
                                setNewQuiz({
                                  ...newQuiz,
                                  title: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                              Subject
                            </label>
                            <select
                              value={newQuiz.subject}
                              onChange={(e) =>
                                setNewQuiz({
                                  ...newQuiz,
                                  subject: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            >
                              {INITIAL_SUBJECTS.map((s) => (
                                <option key={s.id} value={s.id}>
                                  {s.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                              Target Grade
                            </label>
                            <select
                              value={newQuiz.grade}
                              onChange={(e) =>
                                setNewQuiz({
                                  ...newQuiz,
                                  grade: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            >
                              <option value="Class 6">Class 6</option>
                              <option value="Class 7">Class 7</option>
                              <option value="Class 8">Class 8</option>
                              <option value="Class 9">Class 9</option>
                              <option value="Class 10">Class 10</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                              Time Limit (Minutes)
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="60"
                              required
                              value={newQuiz.timeLimitMinutes}
                              onChange={(e) =>
                                setNewQuiz({
                                  ...newQuiz,
                                  timeLimitMinutes:
                                    e.currentTarget.value === ''
                                      ? ''
                                      : e.currentTarget.valueAsNumber,
                                })
                              }
                              className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Question Creator List */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-slate-900 text-lg">
                            Questions ({newQuiz.questions.length})
                          </h3>
                          <button
                            type="button"
                            onClick={handleAddQuestionToNewQuiz}
                            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Question</span>
                          </button>
                        </div>

                        {newQuiz.questions.map((q, qIndex) => (
                          <div
                            key={qIndex}
                            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-emerald-700 text-sm">
                                Question #{qIndex + 1}
                              </span>
                              {newQuiz.questions.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveQuestionFromNewQuiz(qIndex)
                                  }
                                  className="text-rose-500 hover:text-rose-700 p-1 rounded-lg"
                                  title="Remove Question"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-600 mb-1">
                                Question Prompt
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="Enter question sentence..."
                                value={q.question}
                                onChange={(e) =>
                                  handleQuestionChange(
                                    qIndex,
                                    'question',
                                    e.target.value,
                                  )
                                }
                                className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                              />
                            </div>

                            {/* Options A, B, C, D */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {q.options.map((opt, optIndex) => (
                                <div key={optIndex}>
                                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                                    Option {String.fromCharCode(65 + optIndex)}
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                                    value={opt}
                                    onChange={(e) =>
                                      handleOptionChange(
                                        qIndex,
                                        optIndex,
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Correct Option Select & Explanation */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                              <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                  Correct Answer
                                </label>
                                <select
                                  value={q.correctIndex}
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      qIndex,
                                      'correctIndex',
                                      Number(e.target.value),
                                    )
                                  }
                                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                >
                                  <option value={0}>Option A</option>
                                  <option value={1}>Option B</option>
                                  <option value={2}>Option C</option>
                                  <option value={3}>Option D</option>
                                </select>
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                  Explanation / Hint
                                </label>
                                <input
                                  type="text"
                                  placeholder="Why is this the correct answer?"
                                  value={q.explanation}
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      qIndex,
                                      'explanation',
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          type="submit"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md flex items-center space-x-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>Publish Assessment Live</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* --- AUTOMATED PERFORMANCE REPORTS --- */}
                {activeTab === 'reports' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900">
                        Student Class Roster & Report Cards
                      </h1>
                      <p className="text-sm text-slate-500">
                        Automated performance summary based on NCTB curriculum
                        grading.
                      </p>
                    </div>

                    {/* Roster Table */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800">
                          Class 8 - Section A (2026 Batch)
                        </h3>
                        <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
                          Total Roster: {INITIAL_STUDENT_ROSTER.length} Students
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b border-slate-200">
                              <th className="py-3 px-4">Roll</th>
                              <th className="py-3 px-4">Student Name</th>
                              <th className="py-3 px-4">Quizzes Done</th>
                              <th className="py-3 px-4">Avg Score</th>
                              <th className="py-3 px-4">Attendance</th>
                              <th className="py-3 px-4">Strengths</th>
                              <th className="py-3 px-4 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {INITIAL_STUDENT_ROSTER.map((st) => (
                              <tr key={st.id} className="hover:bg-slate-50">
                                <td className="py-3 px-4 font-bold text-slate-500">
                                  #{st.roll}
                                </td>
                                <td className="py-3 px-4">
                                  <div className="font-bold text-slate-900">
                                    {st.name}
                                  </div>
                                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded font-semibold">
                                    {st.badge}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-slate-600 font-semibold">
                                  {st.quizzesCompleted}
                                </td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`font-black ${
                                      st.avgScore >= 85
                                        ? 'text-emerald-600'
                                        : st.avgScore >= 75
                                          ? 'text-blue-600'
                                          : 'text-amber-600'
                                    }`}
                                  >
                                    {st.avgScore}%
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-slate-600">
                                  {st.attendance}
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex flex-wrap gap-1">
                                    {st.strengths.map((str, i) => (
                                      <span
                                        key={i}
                                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                                      >
                                        {str}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <button
                                    onClick={() => setSelectedStudentReport(st)}
                                    className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 inline-flex"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                    <span>Generate Report Card</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODAL: READ STUDY MATERIAL DETAIL                          */}
      {/* ========================================================= */}
      {activeMaterialModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setActiveMaterialModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              {getSubjectInfo(activeMaterialModal.subject).name} •{' '}
              {activeMaterialModal.type}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1 mb-4">
              {activeMaterialModal.title}
            </h2>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 font-mono text-xs whitespace-pre-line text-slate-800 leading-relaxed">
              {activeMaterialModal.content}
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center space-x-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Key Takeaways for Exam Revision</span>
              </h4>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                {activeMaterialModal.keyPoints.map((kp, i) => (
                  <li key={i}>{kp}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  toggleMaterialCompleted(activeMaterialModal.id);
                  setActiveMaterialModal(null);
                }}
                className="bg-emerald-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-emerald-700"
              >
                Mark as Completed (+50 XP)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: PRINTABLE STUDENT REPORT CARD                       */}
      {/* ========================================================= */}
      {selectedStudentReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 md:p-8 shadow-2xl relative my-8 border-4 border-emerald-600">
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudentReport(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 no-print"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Official Report Card Header */}
            <div className="text-center border-b-2 border-slate-200 pb-6 mb-6">
              <div className="flex justify-center mb-2">
                <div className="bg-emerald-700 text-white p-3 rounded-2xl">
                  <GraduationCap className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                DHAKA COLLEGIATE SCHOOL
              </h2>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                NCTB Academic Assessment Summary • Mid-Term 2026
              </p>
              <div className="mt-3 inline-block bg-emerald-100 text-emerald-900 text-xs font-bold px-4 py-1 rounded-full">
                Official Progress Report Card
              </div>
            </div>

            {/* Student Info Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-xs">
              <div>
                <span className="text-slate-400 uppercase font-bold block text-[10px]">
                  Student Name
                </span>
                <span className="font-bold text-slate-900 text-sm">
                  {selectedStudentReport.name}
                </span>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-bold block text-[10px]">
                  Class & Roll
                </span>
                <span className="font-semibold text-slate-800">
                  {selectedStudentReport.grade} (Roll #
                  {selectedStudentReport.roll})
                </span>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-bold block text-[10px]">
                  Attendance
                </span>
                <span className="font-semibold text-slate-800">
                  {selectedStudentReport.attendance}
                </span>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-bold block text-[10px]">
                  Grade Level
                </span>
                <span className="font-bold text-emerald-700">
                  {selectedStudentReport.avgScore >= 80
                    ? 'A+ (Outstanding)'
                    : 'A (Very Good)'}
                </span>
              </div>
            </div>

            {/* Subject Breakdown Table */}
            <h4 className="font-bold text-slate-800 text-sm mb-3">
              Academic Performance & Subject Marks
            </h4>
            <table className="w-full text-left text-xs mb-6 border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-600 font-bold uppercase">
                <tr>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Assessments</th>
                  <th className="py-2.5 px-3">Score %</th>
                  <th className="py-2.5 px-3">Letter Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-800">
                    Mathematics
                  </td>
                  <td className="py-2 px-3">2 Completed</td>
                  <td className="py-2 px-3 text-emerald-700 font-bold">90%</td>
                  <td className="py-2 px-3 font-bold">A+</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-800">
                    General Science
                  </td>
                  <td className="py-2 px-3">2 Completed</td>
                  <td className="py-2 px-3 text-emerald-700 font-bold">88%</td>
                  <td className="py-2 px-3 font-bold">A+</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-800">
                    ICT & Computing
                  </td>
                  <td className="py-2 px-3">1 Completed</td>
                  <td className="py-2 px-3 text-emerald-700 font-bold">85%</td>
                  <td className="py-2 px-3 font-bold">A+</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-800">
                    English Grammar
                  </td>
                  <td className="py-2 px-3">1 Completed</td>
                  <td className="py-2 px-3 text-amber-700 font-bold">75%</td>
                  <td className="py-2 px-3 font-bold">A</td>
                </tr>
              </tbody>
            </table>

            {/* Educator Remarks */}
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 mb-8">
              <h5 className="font-bold text-emerald-950 text-xs mb-1">
                Teacher Remarks & Recommendations:
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{selectedStudentReport.name} has demonstrated excellent
                conceptual clarity in Mathematics and Science. Continued
                practice in English grammar tenses will help achieve top honors
                across all subjects."
              </p>
            </div>

            {/* Signature Area */}
            <div className="flex justify-between items-end pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
              <div>
                <div className="font-bold text-slate-800 underline mb-1">
                  Farhana Yasmin
                </div>
                <span>Class Teacher Signature</span>
              </div>
              <div>
                <div className="font-bold text-slate-800 underline mb-1">
                  Prof. M. A. Rahman
                </div>
                <span>Headmaster / Principal</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-slate-100 no-print">
              <button
                onClick={() => window.print()}
                className="bg-slate-900 text-white px-5 py-2 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download PDF Report</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          <p>
            © 2026 ShikkhaBondhu — Interactive E-Learning & Assessment Portal
            (NCTB Aligned).
          </p>
        </div>
      </footer>
    </div>
  );
}
