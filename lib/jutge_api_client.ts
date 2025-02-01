/**
 * This file has been automatically generated at 2025-01-18T09:24:21.504Z
 *
 * Name:    Jutge API
 * Version: 2.0.0
 *
 * Description: Jutge API
 */

// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */

// Models

export type CredentialsIn = {
    email: string
    password: string
}

export type CredentialsOut = {
    token: string
    expiration: string | string | string | number
    user_uid: string
}

export type Time = {
    full_time: string
    int_timestamp: number
    float_timestamp: number
    time: string
    date: string
}

export type HomepageStats = {
    users: number
    problems: number
    submissions: number
}

export type Language = {
    language_id: string
    eng_name: string
    own_name: string
}

export type Languages = Record<string, Language>

export type Country = {
    country_id: string
    eng_name: string
}

export type Countries = Record<string, Country>

export type Compiler = {
    compiler_id: string
    name: string
    language: string
    extension: string
    description: string | null
    version: string | null
    flags1: string | null
    flags2: string | null
    type: string | null
    warning: string | null
    status: string | null
    notes: string | null
}

export type Compilers = Record<string, Compiler>

export type Driver = {
    driver_id: string
}

export type Drivers = Record<string, Driver>

export type Verdict = {
    verdict_id: string
    name: string
    description: string
}

export type Verdicts = Record<string, Verdict>

export type Proglang = {
    proglang_id: string
}

export type Proglangs = Record<string, Proglang>

export type Tables = {
    languages: Languages
    countries: Countries
    compilers: Compilers
    drivers: Drivers
    verdicts: Verdicts
    proglangs: Proglangs
}

export type BriefAbstractProblem = {
    problem_nm: string
    author: string | null
    author_email: string | null
    public: number | null
    official: number | null
    compilers: string | null
    driver_id: string | null
    type: string | null
    deprecation: string | null
}

export type BriefProblem = {
    problem_id: string
    problem_nm: string
    language_id: string
    title: string
    original_language_id: string
    translator: string | null
    translator_email: string | null
    checked: number | null
}

export type BriefProblemDict = Record<string, BriefProblem>

export type AbstractProblem = {
    problem_nm: string
    author: string | null
    author_email: string | null
    public: number | null
    official: number | null
    compilers: string | null
    driver_id: string | null
    type: string | null
    deprecation: string | null
    problems: BriefProblemDict
}

export type Problem = {
    problem_id: string
    problem_nm: string
    language_id: string
    title: string
    original_language_id: string
    translator: string | null
    translator_email: string | null
    checked: number | null
    abstract_problem: BriefAbstractProblem
}

export type AbstractProblems = Record<string, AbstractProblem>

export type AbstractProblemExtras = {
    compilers_with_ac: string[]
    proglangs_with_ac: string[]
}

export type ProblemExtras = {
    compilers_with_ac: string[]
    proglangs_with_ac: string[]
    official_solution_checks: Record<string, boolean>
    handler: any
}

export type Testcase = {
    name: string
    input_b64: string
    correct_b64: string
}

export type Testcases = Testcase[]

export type AllKeys = {
    problems: string[]
    enrolled_courses: string[]
    available_courses: string[]
    lists: string[]
}

export type Profile = {
    user_uid: string
    email: string
    name: string
    username: string | null
    nickname: string | null
    webpage: string | null
    description: string | null
    affiliation: string | null
    birth_year: number
    max_subsxhour: number
    max_subsxday: number
    administrator: number
    instructor: number
    parent_email: string | null
    country_id: string | null
    timezone_id: string
    compiler_id: string | null
    language_id: string | null
}

export type NewProfile = {
    name: string
    birth_year: number
    nickname: string
    webpage: string
    affiliation: string
    description: string
    country_id: string
    timezone_id: string
}

export type PasswordUpdate = {
    oldPassword: string
    newPassword: string
}

export type TypeA = {
    a: string
}

export type TypeB = {
    a: string
}

export type DateValue = {
    date: number
    value: number
}

export type HeatmapCalendar = DateValue[]

export type Distribution = Record<string, number>

export type Distributions = {
    verdicts: Distribution
    compilers: Distribution
    proglangs: Distribution
    submissions_by_hour: Distribution
    submissions_by_weekday: Distribution
}

export type DashboardStats = Record<string, number | string>

export type Dashboard = {
    stats: DashboardStats
    heatmap: HeatmapCalendar
    distributions: Distributions
}

export type Submission = {
    problem_id: string
    submission_id: string
    compiler_id: string
    annotation: string | null
    state: string
    time_in: string | string | string | number
    veredict: string | null
    veredict_info: string | null
    veredict_publics: string | null
    ok_publics_but_wrong: number
}

export type Submissions = Submission[]

export type DictSubmissions = Record<string, Submission>

export type DictDictSubmissions = Record<string, DictSubmissions>

export type SubmissionPostOut = {
    submission_id: string
}

export type PublicProfile = {
    email: string
    name: string
    username: string | null
}

export type BriefCourse = {
    course_nm: string
    title: string | null
    description: string | null
    annotation: string | null
    public: number
    official: number
}

export type BriefCourses = Record<string, BriefCourse>

export type Course = {
    course_nm: string
    title: string | null
    description: string | null
    annotation: string | null
    public: number
    official: number
    owner: PublicProfile
    lists: string[]
}

export type ListItem = {
    problem_nm: string | null
    description: string | null
}

export type ListItems = ListItem[]

export type BriefList = {
    list_nm: string
    title: string | null
    description: string | null
    annotation: string | null
    public: number
    official: number
}

export type BriefLists = Record<string, BriefList>

export type List = {
    list_nm: string
    title: string | null
    description: string | null
    annotation: string | null
    public: number
    official: number
    items: ListItems
    owner: PublicProfile
}

export type AbstractStatus = {
    problem_nm: string
    nb_submissions: number
    nb_pending_submissions: number
    nb_accepted_submissions: number
    nb_rejected_submissions: number
    nb_scored_submissions: number
    status: string
}

export type AbstractStatuses = Record<string, AbstractStatus>

export type Status = {
    problem_id: string
    problem_nm: string
    nb_submissions: number
    nb_pending_submissions: number
    nb_accepted_submissions: number
    nb_rejected_submissions: number
    nb_scored_submissions: number
    status: string
}

export type Award = {
    award_id: string
    time: string | string | string | number
    type: string
    icon: string
    title: string
    info: string
    youtube: string | null
    submission: Submission | null
}

export type BriefAward = {
    award_id: string
    time: string | string | string | number
    type: string
    icon: string
    title: string
    info: string
    youtube: string | null
}

export type BriefAwards = Record<string, BriefAward>

export type TagsDict = Record<string, string[]>

export type Document = {
    document_nm: string
    title: string
    description: string
}

export type Documents = Document[]

export type InstructorList = {
    list_nm: string
    title: string
    description: string
    annotation: string
    official: number
    public: number
}

export type InstructorLists = InstructorList[]

export type InstructorListItem = {
    problem_nm: string | null
    description: string | null
}

export type InstructorListItems = InstructorListItem[]

export type InstructorListWithItems = {
    list_nm: string
    title: string
    description: string
    annotation: string
    official: number
    public: number
    items: InstructorListItems
}

export type InstructorCourse = {
    course_nm: string
    title: string
    description: string
    annotation: string
    official: number
    public: number
}

export type InstructorCourses = InstructorCourse[]

export type CourseMembers = {
    invited: string[]
    enrolled: string[]
    pending: string[]
}

export type InstructorCourseWithItems = {
    course_nm: string
    title: string
    description: string
    annotation: string
    official: number
    public: number
    lists: string[]
    students: CourseMembers
    tutors: CourseMembers
}

export type InstructorExam = {
    exam_nm: string
    title: string
    place: string | null
    description: string | null
    code: string | null
    time_start: string | string | string | number | null
    exp_time_start: string | string | string | number
    running_time: number
    visible_submissions: number
    started_by: string | null
    contest: number
    instructions: string | null
    avatars: string | null
    anonymous: number
}

export type InstructorExams = InstructorExam[]

export type InstructorExamCourse = {
    title: string
    description: string
    course_nm: string
    annotation: string
}

export type InstructorExamDocument = {
    document_nm: string
    title: string
    description: string
}

export type InstructorExamDocuments = InstructorExamDocument[]

export type InstructorExamProblem = {
    problem_nm: string
    weight: number | null
    icon: string | null
    caption: string | null
}

export type InstructorExamProblems = InstructorExamProblem[]

export type InstructorExamStudent = {
    email: string
    name: string
    code: string | null
    restricted: number
    annotation: string | null
    result: string | null
    finished: number
    banned: number
    reason_ban: string | null
    inc: number | null
    reason_inc: string | null
    taken_exam: number
    emergency_password: string | null
    invited: number
}

export type InstructorExamStudents = InstructorExamStudent[]

export type InstructorExamWithItems = {
    exam_nm: string
    title: string
    place: string | null
    description: string | null
    code: string | null
    time_start: string | string | string | number | null
    exp_time_start: string | string | string | number
    running_time: number
    visible_submissions: number
    started_by: string | null
    contest: number
    instructions: string | null
    avatars: string | null
    anonymous: number
    course: InstructorExamCourse
    documents: InstructorExamDocuments
    problems: InstructorExamProblems
    students: InstructorExamStudents
}

export type InstructorExamCreation = {
    exam_nm: string
    course_nm: string
    title: string
    place: string
    description: string
    instructions: string
    exp_time_start: string
    running_time: number
    contest: number
}

export type InstructorExamStudentPost = {
    email: string
    invited: number
    restricted: number
    code: string
    emergency_password: string
    annotation: string
}

export type InstructorExamStudentsPost = InstructorExamStudentPost[]

export type InstructorExamSubmissionsOptions = {
    problems: string
    include_source: boolean
    include_pdf: boolean
    include_metadata: boolean
    only_last: boolean
}

export type Pack = {
    message: string
    href: string
}

export type SubmissionQuery = {
    email: string
    problem_nm: string
    problem_id: string
    time: string | string | string | number
    ip: string
    verdict: string
}

export type SubmissionsQuery = SubmissionQuery[]

export type InstructorEntry = {
    username: string
    name: string
    email: string
}

export type InstructorEntries = InstructorEntry[]

export type UserCreation = {
    email: string
    name: string
    username: string
    password: string
    administrator: number
    instructor: number
}

export type FreeDiskSpace = {
    disk: string
    filesystem: string
    size: string
    used: string
    available: string
    use: string
    mounted: string
}

export type RecentConnectedUsers = {
    latest_hour: number
    latest_day: number
    latest_week: number
    latest_month: number
    latest_year: number
}

export type RecentSubmissions = {
    latest_01_minutes: number
    latest_05_minutes: number
    latest_15_minutes: number
    latest_60_minutes: number
}

export type RecentLoadAverages = {
    latest_01_minutes: number
    latest_05_minutes: number
    latest_15_minutes: number
}

export type SubmissionsHistograms = {
    latest_hour: number[]
    latest_day: number[]
}

export type Zombies = {
    ies: number
    pendings: number
}

export type AdminDashboard = {
    free_disk_space: Record<string, FreeDiskSpace | null>
    recent_load_averages: RecentLoadAverages
    recent_connected_users: RecentConnectedUsers
    recent_submissions: RecentSubmissions
    submissions_histograms: SubmissionsHistograms
    zombies: Zombies
}

export type UpcomingExam = {
    exam_nm: string
    title: string
    username: string
    email: string
    exp_time_start: string | string | string | number
    running_time: number
    students: number
    name: string
}

export type UpcomingExams = UpcomingExam[]

export type SubmissionQueueItem = {
    submission_uid: string
    submission_id: string
    problem_id: string
    compiler_id: string
    time_in: string | string | string | number
    exam_id: string | null
    veredict: string | null
    user_id: string
    user__name: string
    problem__title: string
}

export type SubmissionQueueItems = SubmissionQueueItem[]

export type UserRankingEntry = {
    user_id: string
    nickname: string | null
    email: string
    name: string
    problems: number
}

export type UserRanking = UserRankingEntry[]

export type DateRange = {
    start: string
    end: string
}

export type TwoFloats = {
    a: number
    b: number
}

export type TwoInts = {
    a: number
    b: number
}

export type Name = {
    name: string
}

export type SomeType = {
    a: string
    b: number
    c: boolean | null
    d: boolean | null
}

// Client types

export interface Meta {
    readonly token: string
    readonly exam: string | null
}

export interface Download {
    readonly content: Uint8Array
    readonly name: string
    readonly type: string
}

// Exceptions

export class UnauthorizedError extends Error {
    name: string = 'UnauthorizedError'
    constructor(public message: string = 'Unauthorized') {
        super(message)
    }
}

export class InfoError extends Error {
    name: string = 'InfoError'
    constructor(public message: string) {
        super(message)
    }
}

export class NotFoundError extends Error {
    name: string = 'NotFoundError'
    constructor(public message: string) {
        super(message)
    }
}

export class InputError extends Error {
    name: string = 'InputError'
    constructor(public message: string) {
        super(message)
    }
}

export class ProtocolError extends Error {
    name: string = 'ProtocolError'
    constructor(public message: string) {
        super(message)
    }
}

/**
 *
 * JutgeApiClient
 *
 */
export class JutgeApiClient {
    //

    /** URL to talk with the API */
    JUTGE_API_URL = process.env.JUTGE_API_URL || 'https://api.jutge.org/api'

    /** Meta information */
    meta: Meta | null = null

    /** Function that sends a request to the API and returns the response. **/
    async execute(func: string, input: any, ifiles: File[] = []): Promise<[any, Download[]]> {
        // prepare form
        const iform = new FormData()
        const idata = { func, input, meta: this.meta }
        iform.append('data', JSON.stringify(idata))
        for (const index in ifiles) iform.append(`file_${index}`, ifiles[index])

        // send request
        const response = await fetch(this.JUTGE_API_URL, {
            method: 'POST',
            body: iform,
        })

        // process response
        const contentType = response.headers.get('content-type')?.split(';')[0].toLowerCase()
        if (contentType !== 'multipart/form-data') {
            throw new ProtocolError('The content type is not multipart/form-data')
        }

        const oform = await response.formData()
        const odata = oform.get('data')
        const { output, error, duration, operation_id, time } = JSON.parse(odata as string)

        if (error) {
            this.throwError(error, operation_id)
        }

        // extract ofiles
        const ofiles = []
        for (const [key, value] of oform.entries()) {
            if (value instanceof File) {
                ofiles.push({
                    content: new Uint8Array(await value.arrayBuffer()),
                    name: value.name,
                    type: value.type,
                })
            }
        }

        return [output, ofiles]
    }

    /** Function that throws the exception received through the API */
    throwError(error: Record<string, any>, operation_id: string | undefined) {
        const message = error.message || 'Unknown error'
        if (error.name === 'UnauthorizedError') {
            throw new UnauthorizedError(message)
        } else if (error.name === 'InfoError') {
            throw new InfoError(message)
        } else if (error.name === 'NotFoundError') {
            throw new NotFoundError(message)
        } else if (error.name === 'InputError') {
            throw new InputError(message)
        } else {
            throw new Error(message)
        }
    }

    /** Easy login */
    async login({ email, password }: { email: string; password: string }): Promise<CredentialsOut> {
        const [credentials, _] = await this.execute('auth.login', { email, password })
        this.meta = { token: credentials.token, exam: null }
        return credentials
    }

    /** Easy logout */
    async logout(): Promise<void> {
        await this.execute('auth.logout', {})
        this.meta = null
    }

    readonly auth: Module_auth
    readonly misc: Module_misc
    readonly tables: Module_tables
    readonly problems: Module_problems
    readonly student: Module_student
    readonly instructor: Module_instructor
    readonly admin: Module_admin
    readonly check: Module_check
    readonly playground: Module_playground

    constructor() {
        this.auth = new Module_auth(this)
        this.misc = new Module_misc(this)
        this.tables = new Module_tables(this)
        this.problems = new Module_problems(this)
        this.student = new Module_student(this)
        this.instructor = new Module_instructor(this)
        this.admin = new Module_admin(this)
        this.check = new Module_check(this)
        this.playground = new Module_playground(this)
    }
}

/**
 *
 * Module with authentication endpoints
 *
 */
class Module_auth {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Login: Get an access token
     *
     * No authentication
     * No warnings
     *
     */
    async login(data: CredentialsIn): Promise<CredentialsOut> {
        const [output, ofiles] = await this.root.execute('auth.login', data)
        return output
    }

    /**
     * Logout: Discard access token
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async logout(): Promise<void> {
        const [output, ofiles] = await this.root.execute('auth.logout', null)
        return output
    }
}

/**
 *
 * Module with miscellaneous endpoints
 *
 */
class Module_misc {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get a fortune message
     *
     * No authentication
     * No warnings
     *
     */
    async getFortune(): Promise<string> {
        const [output, ofiles] = await this.root.execute('misc.getFortune', null)
        return output
    }

    /**
     * Get server time
     *
     * No authentication
     * No warnings
     *
     */
    async getTime(): Promise<Time> {
        const [output, ofiles] = await this.root.execute('misc.getTime', null)
        return output
    }

    /**
     * Get homepage stats
     *
     * No authentication
     * No warnings
     *
     */
    async getHomepageStats(): Promise<HomepageStats> {
        const [output, ofiles] = await this.root.execute('misc.getHomepageStats', null)
        return output
    }

    /**
     * Get Jutge.org logo as a PNG file
     *
     * No authentication
     * No warnings
     *
     */
    async getLogo(): Promise<Download> {
        const [output, ofiles] = await this.root.execute('misc.getLogo', null)
        return ofiles[0]
    }
}

/**
 *
 * Module with quite static tables
 *
 */
class Module_tables {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Returns all languages
     *
     * No authentication
     * No warnings
     * Returns all languages as a dictionary of objects, indexed by id.
     */
    async getLanguages(): Promise<Languages> {
        const [output, ofiles] = await this.root.execute('tables.getLanguages', null)
        return output
    }

    /**
     * Returns all countries
     *
     * No authentication
     * No warnings
     * Returns all countries as a dictionary of objects, indexed by id.
     */
    async getCountries(): Promise<Countries> {
        const [output, ofiles] = await this.root.execute('tables.getCountries', null)
        return output
    }

    /**
     * Returns all compilers
     *
     * No authentication
     * No warnings
     * Returns all compilers as a dictionary of objects, indexed by id.
     */
    async getCompilers(): Promise<Compilers> {
        const [output, ofiles] = await this.root.execute('tables.getCompilers', null)
        return output
    }

    /**
     * Returns all drivers
     *
     * No authentication
     * No warnings
     * Returns all drivers as a dictionary of objects, indexed by id.
     */
    async getDrivers(): Promise<Drivers> {
        const [output, ofiles] = await this.root.execute('tables.getDrivers', null)
        return output
    }

    /**
     * Returns all verdicts
     *
     * No authentication
     * No warnings
     * Returns all verdicts as a dictionary of objects, indexed by id.
     */
    async getVerdicts(): Promise<Verdicts> {
        const [output, ofiles] = await this.root.execute('tables.getVerdicts', null)
        return output
    }

    /**
     * Returns all proglangs
     *
     * No authentication
     * No warnings
     * Returns all proglangs as a dictionary of objects, indexed by id.
     */
    async getProglangs(): Promise<Proglangs> {
        const [output, ofiles] = await this.root.execute('tables.getProglangs', null)
        return output
    }

    /**
     * Returns all tables
     *
     * No authentication
     * No warnings
     * Returns all compilers, countries, drivers, languages, proglangs, and verdicts in a single request. This data does not change often, so you should only request it once per session.
     */
    async getAll(): Promise<Tables> {
        const [output, ofiles] = await this.root.execute('tables.getAll', null)
        return output
    }
}

/**
 *
 *
Module with endpoints related to problems.

There are two types of problems: *abstract problems* and *problems*. An abstract problem is a group of problems. A problem is an instance of an abstract problem in a particular language. Abstract problem are identified by a problem_nm (such as 'P68688'), while problems are identified by a problem_id including its language_id (such as 'P68688_en'). Abstract problems have a list of problems, while problems have an abstract problem. Abstract problems have an author, while problems have a translator.

Available problems depend on the actor issuing the request. For example, non authenticated users can only access public problems, while authenticated users can potentially access more problems.

 *
 */
class Module_problems {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get all available abstract problems
     *
     * 🔐 Authentication: any
     * No warnings
     * Includes problems.
     */
    async getAllAbstractProblems(): Promise<AbstractProblems> {
        const [output, ofiles] = await this.root.execute('problems.getAllAbstractProblems', null)
        return output
    }

    /**
     * Get available abstract problems whose keys are in `problem_nms` (comma separated list)
     *
     * 🔐 Authentication: any
     * No warnings
     * Includes problems.
     */
    async getAbstractProblems(problem_nms: string): Promise<AbstractProblems> {
        const [output, ofiles] = await this.root.execute(
            'problems.getAbstractProblems',
            problem_nms,
        )
        return output
    }

    /**
     * Get available abstract problems that belong to a list
     *
     * 🔐 Authentication: any
     * No warnings
     * Includes problems.
     */
    async getAbstractProblemsInList(list_key: string): Promise<AbstractProblems> {
        const [output, ofiles] = await this.root.execute(
            'problems.getAbstractProblemsInList',
            list_key,
        )
        return output
    }

    /**
     * Get an abstract problem
     *
     * 🔐 Authentication: any
     * No warnings
     * Includes owner and problems
     */
    async getAbstractProblem(problem_nm: string): Promise<AbstractProblem> {
        const [output, ofiles] = await this.root.execute('problems.getAbstractProblem', problem_nm)
        return output
    }

    /**
     * Get extras of an abstract problem
     *
     * 🔐 Authentication: any
     * No warnings
     * Includes accepted compilers and accepted proglangs
     */
    async getAbstractProblemExtras(problem_nm: string): Promise<AbstractProblemExtras> {
        const [output, ofiles] = await this.root.execute(
            'problems.getAbstractProblemExtras',
            problem_nm,
        )
        return output
    }

    /**
     * Get a problem
     *
     * 🔐 Authentication: any
     * No warnings
     * Includes abstract problem, which includes owner
     */
    async getProblem(problem_id: string): Promise<Problem> {
        const [output, ofiles] = await this.root.execute('problems.getProblem', problem_id)
        return output
    }

    /**
     * Get extras of a problem.
     *
     * 🔐 Authentication: any
     * No warnings
     * Includes accepted compilers, accepted proglangs, official solutions checks and handler specifications
     */
    async getProblemExtras(problem_id: string): Promise<ProblemExtras> {
        const [output, ofiles] = await this.root.execute('problems.getProblemExtras', problem_id)
        return output
    }

    /**
     * Get sample testcases of a problem.
     *
     * 🔐 Authentication: any
     * No warnings
     *
     */
    async getSampleTestcases(problem_id: string): Promise<Testcases> {
        const [output, ofiles] = await this.root.execute('problems.getSampleTestcases', problem_id)
        return output
    }

    /**
     * Get public testcases of a problem.
     *
     * 🔐 Authentication: any
     * No warnings
     * Public testcases are like sample testcases, but are not meant to be show in the problem statatement, because of their long length.
     */
    async getPublicTestcases(problem_id: string): Promise<Testcases> {
        const [output, ofiles] = await this.root.execute('problems.getPublicTestcases', problem_id)
        return output
    }

    /**
     * Get Html statement of a problem.
     *
     * 🔐 Authentication: any
     * No warnings
     * Currently, this is suboptimal, but I already know how to improve it.
     */
    async getHtmlStatement(problem_id: string): Promise<string> {
        const [output, ofiles] = await this.root.execute('problems.getHtmlStatement', problem_id)
        return output
    }

    /**
     * Get Text statement of a problem.
     *
     * 🔐 Authentication: any
     * No warnings
     *
     */
    async getTextStatement(problem_id: string): Promise<string> {
        const [output, ofiles] = await this.root.execute('problems.getTextStatement', problem_id)
        return output
    }

    /**
     * Get Markdown statement of a problem.
     *
     * 🔐 Authentication: any
     * No warnings
     *
     */
    async getMarkdownStatement(problem_id: string): Promise<string> {
        const [output, ofiles] = await this.root.execute(
            'problems.getMarkdownStatement',
            problem_id,
        )
        return output
    }

    /**
     * Get PDF statement of a problem.
     *
     * 🔐 Authentication: any
     * No warnings
     *
     */
    async getPdfStatement(problem_id: string): Promise<Download> {
        const [output, ofiles] = await this.root.execute('problems.getPdfStatement', problem_id)
        return ofiles[0]
    }

    /**
     * Get ZIP archive of a problem.
     *
     * 🔐 Authentication: any
     * No warnings
     *
     */
    async getZipStatement(problem_id: string): Promise<Download> {
        const [output, ofiles] = await this.root.execute('problems.getZipStatement', problem_id)
        return ofiles[0]
    }
}

/**
 *
 * These operations are available to all users, provided they are authenticated.
 *
 */
class Module_student {
    private readonly root: JutgeApiClient

    readonly keys: Module_student_keys
    readonly profile: Module_student_profile
    readonly dashboard: Module_student_dashboard
    readonly submissions: Module_student_submissions
    readonly courses: Module_student_courses
    readonly lists: Module_student_lists
    readonly statuses: Module_student_statuses
    readonly awards: Module_student_awards

    constructor(root: JutgeApiClient) {
        this.root = root
        this.keys = new Module_student_keys(root)
        this.profile = new Module_student_profile(root)
        this.dashboard = new Module_student_dashboard(root)
        this.submissions = new Module_student_submissions(root)
        this.courses = new Module_student_courses(root)
        this.lists = new Module_student_lists(root)
        this.statuses = new Module_student_statuses(root)
        this.awards = new Module_student_awards(root)
    }
}

/**
 *
 * No description yet
 *
 */
class Module_student_keys {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get problem, courses (enrolled and available) and list keys.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getAll(): Promise<AllKeys> {
        const [output, ofiles] = await this.root.execute('student.keys.getAll', null)
        return output
    }

    /**
     * Get problem keys.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getProblems(): Promise<string[]> {
        const [output, ofiles] = await this.root.execute('student.keys.getProblems', null)
        return output
    }

    /**
     * Get enrolled course keys.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getEnrolledCourses(): Promise<string[]> {
        const [output, ofiles] = await this.root.execute('student.keys.getEnrolledCourses', null)
        return output
    }

    /**
     * Get available course keys.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getAvailableCourses(): Promise<string[]> {
        const [output, ofiles] = await this.root.execute('student.keys.getAvailableCourses', null)
        return output
    }

    /**
     * Get list keys.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getLists(): Promise<string[]> {
        const [output, ofiles] = await this.root.execute('student.keys.getLists', null)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_student_profile {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get the profile.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async get(): Promise<Profile> {
        const [output, ofiles] = await this.root.execute('student.profile.get', null)
        return output
    }

    /**
     * Update the profile
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async update(data: NewProfile): Promise<void> {
        const [output, ofiles] = await this.root.execute('student.profile.update', data)
        return output
    }

    /**
     * Returns the avatar as a PNG file.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getAvatar(): Promise<Download> {
        const [output, ofiles] = await this.root.execute('student.profile.getAvatar', null)
        return ofiles[0]
    }

    /**
     * Set a PNG file as avatar
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async setAvatar(ifile: File): Promise<void> {
        const [output, ofiles] = await this.root.execute('student.profile.setAvatar', null, [ifile])
        return output
    }

    /**
     * Change password
     *
     * 🔐 Authentication: user
     * No warnings
     * Receives the old password and the new one, and changes the password if the old one is correct
     */
    async changePassword(data: PasswordUpdate): Promise<void> {
        const [output, ofiles] = await this.root.execute('student.profile.changePassword', data)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_student_dashboard {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get all distributions
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getAllDistributions(): Promise<Distributions> {
        const [output, ofiles] = await this.root.execute(
            'student.dashboard.getAllDistributions',
            null,
        )
        return output
    }

    /**
     * Get compilers distribution
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getCompilersDistribution(): Promise<Distribution> {
        const [output, ofiles] = await this.root.execute(
            'student.dashboard.getCompilersDistribution',
            null,
        )
        return output
    }

    /**
     * Get dashboard
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getDashboard(): Promise<Dashboard> {
        const [output, ofiles] = await this.root.execute('student.dashboard.getDashboard', null)
        return output
    }

    /**
     * Get heatmap calendar of submissions
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getHeatmapCalendar(): Promise<HeatmapCalendar> {
        const [output, ofiles] = await this.root.execute(
            'student.dashboard.getHeatmapCalendar',
            null,
        )
        return output
    }

    /**
     * Get programming languages distribution
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getProglangsDistribution(): Promise<Distribution> {
        const [output, ofiles] = await this.root.execute(
            'student.dashboard.getProglangsDistribution',
            null,
        )
        return output
    }

    /**
     * Get dashboard stats
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getStats(): Promise<DashboardStats> {
        const [output, ofiles] = await this.root.execute('student.dashboard.getStats', null)
        return output
    }

    /**
     * Get submissions by hour distribution
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getSubmissionsByHour(): Promise<Distribution> {
        const [output, ofiles] = await this.root.execute(
            'student.dashboard.getSubmissionsByHour',
            null,
        )
        return output
    }

    /**
     * Get submissions by weekday distribution
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getSubmissionsByWeekDay(): Promise<Distribution> {
        const [output, ofiles] = await this.root.execute(
            'student.dashboard.getSubmissionsByWeekDay',
            null,
        )
        return output
    }

    /**
     * Get verdicts distribution
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getVerdictsDistribution(): Promise<Distribution> {
        const [output, ofiles] = await this.root.execute(
            'student.dashboard.getVerdictsDistribution',
            null,
        )
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_student_submissions {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get all submissions.
     *
     * 🔐 Authentication: user
     * No warnings
     * Flat array of submissions in chronological order.
     */
    async getAll(): Promise<Submissions> {
        const [output, ofiles] = await this.root.execute('student.submissions.getAll', null)
        return output
    }

    /**
     * Get all submissions for an abstract problem.
     *
     * 🔐 Authentication: user
     * No warnings
     * Grouped by problem.
     */
    async getForAbstractProblem(problem_nm: string): Promise<DictDictSubmissions> {
        const [output, ofiles] = await this.root.execute(
            'student.submissions.getForAbstractProblem',
            problem_nm,
        )
        return output
    }

    /**
     * Get all submissions for a problem.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getForProblem(problem_id: string): Promise<DictSubmissions> {
        const [output, ofiles] = await this.root.execute(
            'student.submissions.getForProblem',
            problem_id,
        )
        return output
    }

    /**
     * Get a submission.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async get(data: { problem_id: string; submission_id: string }): Promise<Submission> {
        const [output, ofiles] = await this.root.execute('student.submissions.get', data)
        return output
    }

    /**
     * Perform a submission.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async submit(
        data: { problem_id: string; compiler_id: string; annotation: string },
        ifile: File,
    ): Promise<SubmissionPostOut> {
        const [output, ofiles] = await this.root.execute('student.submissions.submit', data, [
            ifile,
        ])
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_student_courses {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get all available courses.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getAllAvailable(): Promise<BriefCourses> {
        const [output, ofiles] = await this.root.execute('student.courses.getAllAvailable', null)
        return output
    }

    /**
     * Get all enrolled courses.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getAllEnrolled(): Promise<BriefCourses> {
        const [output, ofiles] = await this.root.execute('student.courses.getAllEnrolled', null)
        return output
    }

    /**
     * Get an available course.
     *
     * 🔐 Authentication: user
     * No warnings
     * Includes owner and lists.
     */
    async getAvailable(course_key: string): Promise<Course> {
        const [output, ofiles] = await this.root.execute('student.courses.getAvailable', course_key)
        return output
    }

    /**
     * Get an enrolled course.
     *
     * 🔐 Authentication: user
     * No warnings
     * Includes owner and lists.
     */
    async getEnrolled(course_key: string): Promise<Course> {
        const [output, ofiles] = await this.root.execute('student.courses.getEnrolled', course_key)
        return output
    }

    /**
     * Enroll in an available course.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async enroll(course_key: string): Promise<void> {
        const [output, ofiles] = await this.root.execute('student.courses.enroll', course_key)
        return output
    }

    /**
     * Unenroll from an enrolled course.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async unenroll(course_key: string): Promise<void> {
        const [output, ofiles] = await this.root.execute('student.courses.unenroll', course_key)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_student_lists {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get all lists.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getAll(): Promise<BriefLists> {
        const [output, ofiles] = await this.root.execute('student.lists.getAll', null)
        return output
    }

    /**
     * Get a list.
     *
     * 🔐 Authentication: user
     * No warnings
     * Includes items, owner.
     */
    async get(list_key: string): Promise<List> {
        const [output, ofiles] = await this.root.execute('student.lists.get', list_key)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_student_statuses {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get statuses for all problems.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getAll(): Promise<AbstractStatuses> {
        const [output, ofiles] = await this.root.execute('student.statuses.getAll', null)
        return output
    }

    /**
     * Get status for an abstract problem.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getForAbstractProblem(problem_nm: string): Promise<AbstractStatus> {
        const [output, ofiles] = await this.root.execute(
            'student.statuses.getForAbstractProblem',
            problem_nm,
        )
        return output
    }

    /**
     * Get status for a problem.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getForProblem(problem_id: string): Promise<Status> {
        const [output, ofiles] = await this.root.execute(
            'student.statuses.getForProblem',
            problem_id,
        )
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_student_awards {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get all awards.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async getAll(): Promise<BriefAwards> {
        const [output, ofiles] = await this.root.execute('student.awards.getAll', null)
        return output
    }

    /**
     * Get an award.
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async get(award_id: string): Promise<Award> {
        const [output, ofiles] = await this.root.execute('student.awards.get', award_id)
        return output
    }
}

/**
 *
 * This module is meant to be used by instructors
 *
 */
class Module_instructor {
    private readonly root: JutgeApiClient

    readonly tags: Module_instructor_tags
    readonly documents: Module_instructor_documents
    readonly lists: Module_instructor_lists
    readonly courses: Module_instructor_courses
    readonly exams: Module_instructor_exams
    readonly queries: Module_instructor_queries
    readonly problems: Module_instructor_problems

    constructor(root: JutgeApiClient) {
        this.root = root
        this.tags = new Module_instructor_tags(root)
        this.documents = new Module_instructor_documents(root)
        this.lists = new Module_instructor_lists(root)
        this.courses = new Module_instructor_courses(root)
        this.exams = new Module_instructor_exams(root)
        this.queries = new Module_instructor_queries(root)
        this.problems = new Module_instructor_problems(root)
    }
}

/**
 *
 * No description yet
 *
 */
class Module_instructor_tags {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get all tags
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async getAll(): Promise<string[]> {
        const [output, ofiles] = await this.root.execute('instructor.tags.getAll', null)
        return output
    }

    /**
     * Get all tags with their problems
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async getDict(): Promise<TagsDict> {
        const [output, ofiles] = await this.root.execute('instructor.tags.getDict', null)
        return output
    }

    /**
     * Get all problems with a given tag
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async get(tag: string): Promise<string[]> {
        const [output, ofiles] = await this.root.execute('instructor.tags.get', tag)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_instructor_documents {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get index of all documents
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async index(): Promise<Documents> {
        const [output, ofiles] = await this.root.execute('instructor.documents.index', null)
        return output
    }

    /**
     * Get a document (without PDF)
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async get(document_nm: string): Promise<Document> {
        const [output, ofiles] = await this.root.execute('instructor.documents.get', document_nm)
        return output
    }

    /**
     * Get PDF of a document
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async getPdf(document_nm: string): Promise<Download> {
        const [output, ofiles] = await this.root.execute('instructor.documents.getPdf', document_nm)
        return ofiles[0]
    }

    /**
     * Create a new document
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async create(data: Document, ifile: File): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.documents.create', data, [
            ifile,
        ])
        return output
    }

    /**
     * Update a document (without PDF)
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async update(data: Document): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.documents.update', data)
        return output
    }

    /**
     * Update PDF of a document
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async updatePdf(document_nm: string, ifile: File): Promise<void> {
        const [output, ofiles] = await this.root.execute(
            'instructor.documents.updatePdf',
            document_nm,
            [ifile],
        )
        return output
    }

    /**
     * Remove a document (including PDF)
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async remove(document_nm: string): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.documents.remove', document_nm)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_instructor_lists {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get index of all lists
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async index(): Promise<InstructorLists> {
        const [output, ofiles] = await this.root.execute('instructor.lists.index', null)
        return output
    }

    /**
     * Get a list with its items
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async get(list_nm: string): Promise<InstructorListWithItems> {
        const [output, ofiles] = await this.root.execute('instructor.lists.get', list_nm)
        return output
    }

    /**
     * Get the items of a list
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async getItems(list_nm: string): Promise<InstructorListItems> {
        const [output, ofiles] = await this.root.execute('instructor.lists.getItems', list_nm)
        return output
    }

    /**
     * Create a new list
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async create(data: InstructorList): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.lists.create', data)
        return output
    }

    /**
     * Update an existing list
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async update(data: InstructorList): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.lists.update', data)
        return output
    }

    /**
     * Delete an existing list
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async remove(list_nm: string): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.lists.remove', list_nm)
        return output
    }

    /**
     * Set the items of a list
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async setItems(data: { list_nm: string; items: InstructorListItems }): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.lists.setItems', data)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_instructor_courses {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get index of all courses
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async index(): Promise<InstructorCourses> {
        const [output, ofiles] = await this.root.execute('instructor.courses.index', null)
        return output
    }

    /**
     * Get a course with its items (lists, courses and tutors)
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async get(course_nm: string): Promise<InstructorCourseWithItems> {
        const [output, ofiles] = await this.root.execute('instructor.courses.get', course_nm)
        return output
    }

    /**
     * Get lists of a course
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async getLists(course_nm: string): Promise<string[]> {
        const [output, ofiles] = await this.root.execute('instructor.courses.getLists', course_nm)
        return output
    }

    /**
     * Get students of a course
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async getStudents(course_nm: string): Promise<CourseMembers> {
        const [output, ofiles] = await this.root.execute(
            'instructor.courses.getStudents',
            course_nm,
        )
        return output
    }

    /**
     * Get tutors of a course
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async getTutors(course_nm: string): Promise<CourseMembers> {
        const [output, ofiles] = await this.root.execute('instructor.courses.getTutors', course_nm)
        return output
    }

    /**
     * Create a new course
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async create(data: InstructorCourse): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.courses.create', data)
        return output
    }

    /**
     * Update an existing course
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async update(data: InstructorCourse): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.courses.update', data)
        return output
    }

    /**
     * Delete an existing course
     *
     * 🔐 Authentication: instructor
     * No warnings
     * Note: A course should not be deleted. Ask a system administrator to remove it.
     */
    async remove(course_nm: string): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.courses.remove', course_nm)
        return output
    }

    /**
     * Set lists of a course
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async setLists(data: { course_nm: string; lists: string[] }): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.courses.set_lists', data)
        return output
    }

    /**
     * Invite students to a course
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async inviteStudents(data: { course_nm: string; emails: string[] }): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.courses.invite_students', data)
        return output
    }

    /**
     * Invite tutors to a course
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async inviteTutors(data: { course_nm: string; emails: string[] }): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.courses.invite_tutors', data)
        return output
    }

    /**
     * Remove students from a course
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async removeStudents(data: { course_nm: string; emails: string[] }): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.courses.remove_students', data)
        return output
    }

    /**
     * Remove tutors from a course
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async removeTutors(data: { course_nm: string; emails: string[] }): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.courses.remove_tutors', data)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_instructor_exams {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get index of all exams
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async index(): Promise<InstructorExams> {
        const [output, ofiles] = await this.root.execute('instructor.exams.index', null)
        return output
    }

    /**
     * Get an exam with its items (course, problems, documents, students)
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async get(exam_nm: string): Promise<InstructorExamWithItems> {
        const [output, ofiles] = await this.root.execute('instructor.exams.get', exam_nm)
        return output
    }

    /**
     * Create a new exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async create(data: InstructorExamCreation): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.exams.create', data)
        return output
    }

    /**
     * Update an existing exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async update(data: InstructorExamCreation): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.exams.update', data)
        return output
    }

    /**
     * Delete an existing exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     * Note: An exam can only be deleted if it has not started.
     */
    async remove(exam_nm: string): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.exams.remove', exam_nm)
        return output
    }

    /**
     * Get documents of an exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async getDocuments(exam_nm: string): Promise<InstructorExamDocuments> {
        const [output, ofiles] = await this.root.execute('instructor.exams.getDocuments', exam_nm)
        return output
    }

    /**
     * Get course of an exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async getCourse(exam_nm: string): Promise<InstructorExamCourse> {
        const [output, ofiles] = await this.root.execute('instructor.exams.getCourse', exam_nm)
        return output
    }

    /**
     * Get problems of an exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async getProblems(exam_nm: string): Promise<InstructorExamProblems> {
        const [output, ofiles] = await this.root.execute('instructor.exams.getProblems', exam_nm)
        return output
    }

    /**
     * Get students of an exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async getStudents(exam_nm: string): Promise<InstructorExamStudents> {
        const [output, ofiles] = await this.root.execute('instructor.exams.getStudents', exam_nm)
        return output
    }

    /**
     * Get an student of an exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async getStudent(data: { exam_nm: string; email: string }): Promise<InstructorExamStudent> {
        const [output, ofiles] = await this.root.execute('instructor.exams.getStudent', data)
        return output
    }

    /**
     * Get submissions of an exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     * This endpoint prepares a ZIP file to download the submissions of an exam. Preparing the ZIP file takes some time, an href link to the ZIP will be returned. This ZIP file will be available for download for a limited time.
     */
    async getSubmissions(data: {
        exam_nm: string
        options: InstructorExamSubmissionsOptions
    }): Promise<Pack> {
        const [output, ofiles] = await this.root.execute('instructor.exams.getSubmissions', data)
        return output
    }

    /**
     * Set documents of an exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async setDocuments(data: { exam_nm: string; document_nms: string[] }): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.exams.setDocuments', data)
        return output
    }

    /**
     * Set problems of an exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async setProblems(data: { exam_nm: string; problems: InstructorExamProblems }): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.exams.setProblems', data)
        return output
    }

    /**
     * Set students of an exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async setStudents(data: {
        exam_nm: string
        students: InstructorExamStudentsPost
    }): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.exams.setStudents', data)
        return output
    }

    /**
     * Add students to an exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async addStudents(data: {
        exam_nm: string
        students: InstructorExamStudentsPost
    }): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.exams.addStudents', data)
        return output
    }

    /**
     * Remove students from an exam
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async removeStudents(data: { exam_nm: string; emails: string[] }): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.exams.removeStudents', data)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_instructor_queries {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get submissions for a problem in a course.
     *
     * 🔐 Authentication: instructor
     * No warnings
     * Returns a list of submissions for a given problem for all students of a given course. Each submission includes the email, time, problem name, problem id, verdict, and IP address. The list is ordered by email and time. Known as ricard01 in the past.
     */
    async getCourseProblemSubmissions(data: {
        course_nm: string
        problem_nm: string
    }): Promise<SubmissionsQuery> {
        const [output, ofiles] = await this.root.execute(
            'instructor.queries.getCourseProblemSubmissions',
            data,
        )
        return output
    }

    /**
     * Get submissions for all problems in a list in a course.
     *
     * 🔐 Authentication: instructor
     * No warnings
     * Returns a list of submissions for all problems in a given list for all students of a given course. Each submission includes the email, time, problem name, problem id, verdict, and IP address. The list is ordered by email, problem id and time. Known as ricard02 in the past.
     */
    async getCourseListSubmissions(data: {
        course_nm: string
        list_nm: string
    }): Promise<SubmissionsQuery> {
        const [output, ofiles] = await this.root.execute(
            'instructor.queries.getCourseListSubmissions',
            data,
        )
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_instructor_problems {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get the passcode of a problem.
     *
     * 🔐 Authentication: instructor
     * No warnings
     * Returns an empty string if the problem has no passcode.
     */
    async getPasscode(problem_nm: string): Promise<string> {
        const [output, ofiles] = await this.root.execute(
            'instructor.problems.getPasscode',
            problem_nm,
        )
        return output
    }

    /**
     * Set or update the passcode of a problem.
     *
     * 🔐 Authentication: instructor
     * No warnings
     * The passcode must be at least 8 characters long and contain only alphanumeric characters. The passcode will be stored in the database in plain text.
     */
    async setPasscode(data: { problem_nm: string; passcode: string }): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.problems.setPasscode', data)
        return output
    }

    /**
     * Remove passcode of a problem.
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async removePasscode(problem_nm: string): Promise<void> {
        const [output, ofiles] = await this.root.execute(
            'instructor.problems.removePasscode',
            problem_nm,
        )
        return output
    }

    /**
     * Deprecate a problem.
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async deprecate(data: { problem_nm: string; reason: string }): Promise<void> {
        const [output, ofiles] = await this.root.execute('instructor.problems.deprecate', data)
        return output
    }

    /**
     * Undeprecate a problem.
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async undeprecate(problem_nm: string): Promise<void> {
        const [output, ofiles] = await this.root.execute(
            'instructor.problems.undeprecate',
            problem_nm,
        )
        return output
    }

    /**
     * Download a problem.
     *
     * 🔐 Authentication: instructor
     * No warnings
     * Quick and dirty implementation, should be improved. Returns a zip file with the abstract problem and all its problems.
     */
    async download(problem_nm: string): Promise<Download> {
        const [output, ofiles] = await this.root.execute('instructor.problems.download', problem_nm)
        return ofiles[0]
    }
}

/**
 *
 * Module with administration endpoints. Not meant for regular users. It still lacks lots of endpoints
 *
 */
class Module_admin {
    private readonly root: JutgeApiClient

    readonly instructors: Module_admin_instructors
    readonly users: Module_admin_users
    readonly dashboard: Module_admin_dashboard
    readonly queue: Module_admin_queue
    readonly tasks: Module_admin_tasks
    readonly stats: Module_admin_stats
    readonly problems: Module_admin_problems

    constructor(root: JutgeApiClient) {
        this.root = root
        this.instructors = new Module_admin_instructors(root)
        this.users = new Module_admin_users(root)
        this.dashboard = new Module_admin_dashboard(root)
        this.queue = new Module_admin_queue(root)
        this.tasks = new Module_admin_tasks(root)
        this.stats = new Module_admin_stats(root)
        this.problems = new Module_admin_problems(root)
    }
}

/**
 *
 * No description yet
 *
 */
class Module_admin_instructors {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get instructors
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async get(): Promise<InstructorEntries> {
        const [output, ofiles] = await this.root.execute('admin.instructors.get', null)
        return output
    }

    /**
     * Add an instructor
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async add(data: { email: string; username: string }): Promise<void> {
        const [output, ofiles] = await this.root.execute('admin.instructors.add', data)
        return output
    }

    /**
     * Remove an instructor
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async remove(email: string): Promise<void> {
        const [output, ofiles] = await this.root.execute('admin.instructors.remove', email)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_admin_users {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Count users
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async count(): Promise<number> {
        const [output, ofiles] = await this.root.execute('admin.users.count', null)
        return output
    }

    /**
     * Create a user
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async create(data: UserCreation): Promise<void> {
        const [output, ofiles] = await this.root.execute('admin.users.create', data)
        return output
    }

    /**
     * Remove a user
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async remove(email: string): Promise<void> {
        const [output, ofiles] = await this.root.execute('admin.users.remove', email)
        return output
    }

    /**
     * Set a password for a user
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async setPassword(data: { email: string; password: string }): Promise<void> {
        const [output, ofiles] = await this.root.execute('admin.users.setPassword', data)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_admin_dashboard {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get all admin dashboard items.
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getAll(): Promise<AdminDashboard> {
        const [output, ofiles] = await this.root.execute('admin.dashboard.getAll', null)
        return output
    }

    /**
     * Get free disk space.
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getFreeDiskSpace(): Promise<Record<string, FreeDiskSpace | null>> {
        const [output, ofiles] = await this.root.execute('admin.dashboard.getFreeDiskSpace', null)
        return output
    }

    /**
     * Get recent connected users.
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getRecentConnectedUsers(): Promise<RecentConnectedUsers> {
        const [output, ofiles] = await this.root.execute(
            'admin.dashboard.getRecentConnectedUsers',
            null,
        )
        return output
    }

    /**
     * Get recent load averages.
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getRecentLoadAverages(): Promise<RecentLoadAverages> {
        const [output, ofiles] = await this.root.execute(
            'admin.dashboard.getRecentLoadAverages',
            null,
        )
        return output
    }

    /**
     * Get recent submissions.
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getRecentSubmissions(): Promise<RecentSubmissions> {
        const [output, ofiles] = await this.root.execute(
            'admin.dashboard.getRecentSubmissions',
            null,
        )
        return output
    }

    /**
     * Get submissions histograms.
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getSubmissionsHistograms(): Promise<SubmissionsHistograms> {
        const [output, ofiles] = await this.root.execute(
            'admin.dashboard.getSubmissionsHistograms',
            null,
        )
        return output
    }

    /**
     * Get zombies.
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getZombies(): Promise<Zombies> {
        const [output, ofiles] = await this.root.execute('admin.dashboard.getZombies', null)
        return output
    }

    /**
     * Get upcoming exams
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getUpcomingExams(): Promise<UpcomingExams> {
        const [output, ofiles] = await this.root.execute('admin.dashboard.getUpcomingExams', null)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_admin_queue {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get the last 100 submissions from the queue in descending chronological order.
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getQueue(): Promise<SubmissionQueueItems> {
        const [output, ofiles] = await this.root.execute('admin.queue.getQueue', null)
        return output
    }

    /**
     * Get the last 100 zombi submissions from the queue.
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getQueueZombies(): Promise<SubmissionQueueItems> {
        const [output, ofiles] = await this.root.execute('admin.queue.getQueueZombies', null)
        return output
    }

    /**
     * Get the last 100 fatal submissions from the queue.
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getQueueFatals(): Promise<SubmissionQueueItems> {
        const [output, ofiles] = await this.root.execute('admin.queue.getQueueFatals', null)
        return output
    }

    /**
     * Get the last 100 setter error submissions from the queue.
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getQueueSetterErrors(): Promise<SubmissionQueueItems> {
        const [output, ofiles] = await this.root.execute('admin.queue.getQueueSetterErrors', null)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_admin_tasks {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Purge expired access tokens
     *
     * 🔐 Authentication: admin
     * No warnings
     * Purge expired access tokens (call it from time to time, it does not hurt)
     */
    async purgeAuthTokens(): Promise<void> {
        const [output, ofiles] = await this.root.execute('admin.tasks.purge-auth-tokens', null)
        return output
    }

    /**
     * Clear all memoization caches
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async clearCaches(): Promise<void> {
        const [output, ofiles] = await this.root.execute('admin.tasks.clear-caches', null)
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_admin_stats {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get counters
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getCounters(): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute('admin.stats.getCounters', null)
        return output
    }

    /**
     * Get distribution of verdicts
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfVerdicts(): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfVerdicts',
            null,
        )
        return output
    }

    /**
     * Get distribution of verdicts by year
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfVerdictsByYear(): Promise<Record<string, number>[]> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfVerdictsByYear',
            null,
        )
        return output
    }

    /**
     * Get distribution of compilers
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfCompilers(): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfCompilers',
            null,
        )
        return output
    }

    /**
     * Get distribution of proglangs
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfProglangs(): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfProglangs',
            null,
        )
        return output
    }

    /**
     * Get distribution of registered users by year
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfUsersByYear(): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfUsersByYear',
            null,
        )
        return output
    }

    /**
     * Get distribution of registered users by country
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfUsersByCountry(): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfUsersByCountry',
            null,
        )
        return output
    }

    /**
     * Get distribution of registered users by submissions using a custom bucket size
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfUsersBySubmissions(data: number): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfUsersBySubmissions',
            data,
        )
        return output
    }

    /**
     * Get ranking of users
     *
     * 🔐 Authentication: admin
     * ❌ Warning: Input type is not correct
     *
     */
    async getRankingOfUsers(data: string | number): Promise<UserRanking> {
        const [output, ofiles] = await this.root.execute('admin.stats.getRankingOfUsers', data)
        return output
    }

    /**
     * Get distribution of submissions by hour
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfSubmissionsByHour(): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfSubmissionsByHour',
            null,
        )
        return output
    }

    /**
     * Get distribution of submissions by proglang
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfSubmissionsByProglang(): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfSubmissionsByProglang',
            null,
        )
        return output
    }

    /**
     * Get distribution of submissions by compiler
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfSubmissionsByCompiler(): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfSubmissionsByCompiler',
            null,
        )
        return output
    }

    /**
     * Get distribution of submissions by weekday
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfSubmissionsByWeekday(): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfSubmissionsByWeekday',
            null,
        )
        return output
    }

    /**
     * Get distribution of submissions by year
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfSubmissionsByYear(): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfSubmissionsByYear',
            null,
        )
        return output
    }

    /**
     * Get distribution of submissions by year for a proglang
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfSubmissionsByYearForProglang(
        proglang: string,
    ): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfSubmissionsByYearForProglang',
            proglang,
        )
        return output
    }

    /**
     * Get distribution of submissions by day
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getDistributionOfSubmissionsByDay(): Promise<Record<string, number>> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getDistributionOfSubmissionsByDay',
            null,
        )
        return output
    }

    /**
     * Get heatmap calendar of submissions
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async getHeatmapCalendarOfSubmissions(data: DateRange): Promise<any> {
        const [output, ofiles] = await this.root.execute(
            'admin.stats.getHeatmapCalendarOfSubmissions',
            data,
        )
        return output
    }
}

/**
 *
 * No description yet
 *
 */
class Module_admin_problems {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Get official solution for a problem for a proglang
     *
     * 🔐 Authentication: admin
     * ❌ Warning: TODO
     *
     */
    async getProblemSolution(data: { problem_id: string; proglang: string }): Promise<string> {
        const [output, ofiles] = await this.root.execute('admin.problems.getProblemSolution', data)
        return output
    }
}

/**
 *
 * This module is intended for internal use and contains functions to check the actor of the query. General public should not rely on it.
 *
 */
class Module_check {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Checks that query actor is a user
     *
     * 🔐 Authentication: user
     * No warnings
     *
     */
    async checkUser(): Promise<void> {
        const [output, ofiles] = await this.root.execute('check.checkUser', null)
        return output
    }

    /**
     * Checks that query actor is an instructor
     *
     * 🔐 Authentication: instructor
     * No warnings
     *
     */
    async checkInstructor(): Promise<void> {
        const [output, ofiles] = await this.root.execute('check.checkInstructor', null)
        return output
    }

    /**
     * Checks that query actor is an admin
     *
     * 🔐 Authentication: admin
     * No warnings
     *
     */
    async checkAdmin(): Promise<void> {
        const [output, ofiles] = await this.root.execute('check.checkAdmin', null)
        return output
    }

    /**
     * Throw an exception of the given type
     *
     * No authentication
     * No warnings
     *
     */
    async throwError(exception: string): Promise<void> {
        const [output, ofiles] = await this.root.execute('check.throwError', exception)
        return output
    }
}

/**
 *
 * This module is intended for internal use. General users should not rely on it.
 *
 */
class Module_playground {
    private readonly root: JutgeApiClient

    constructor(root: JutgeApiClient) {
        this.root = root
    }

    /**
     * Upload a file
     *
     * No authentication
     * No warnings
     *
     */
    async upload(data: Name, ifile: File): Promise<string> {
        const [output, ofiles] = await this.root.execute('playground.upload', data, [ifile])
        return output
    }

    /**
     * Get negative of an image
     *
     * No authentication
     * No warnings
     *
     */
    async negate(ifile: File): Promise<Download> {
        const [output, ofiles] = await this.root.execute('playground.negate', null, [ifile])
        return ofiles[0]
    }

    /**
     * Download a file
     *
     * No authentication
     * No warnings
     *
     */
    async download(data: Name): Promise<Download> {
        const [output, ofiles] = await this.root.execute('playground.download', data)
        return ofiles[0]
    }

    /**
     * Download a file with a string
     *
     * No authentication
     * No warnings
     *
     */
    async download2(data: Name): Promise<[string, Download]> {
        const [output, ofiles] = await this.root.execute('playground.download2', data)
        return [output, ofiles[0]]
    }

    /**
     * Ping the server to get a pong string
     *
     * No authentication
     * No warnings
     *
     */
    async ping(): Promise<string> {
        const [output, ofiles] = await this.root.execute('playground.ping', null)
        return output
    }

    /**
     * Returns the given string in uppercase
     *
     * No authentication
     * No warnings
     *
     */
    async toUpperCase(s: string): Promise<string> {
        const [output, ofiles] = await this.root.execute('playground.toUpperCase', s)
        return output
    }

    /**
     * Returns the sum of two integers
     *
     * No authentication
     * No warnings
     *
     */
    async add2i(data: TwoInts): Promise<number> {
        const [output, ofiles] = await this.root.execute('playground.add2i', data)
        return output
    }

    /**
     * Returns the sum of two floats
     *
     * No authentication
     * No warnings
     *
     */
    async add2f(data: TwoFloats): Promise<number> {
        const [output, ofiles] = await this.root.execute('playground.add2f', data)
        return output
    }

    /**
     * increment two numbers
     *
     * No authentication
     * No warnings
     *
     */
    async inc(data: TwoInts): Promise<TwoInts> {
        const [output, ofiles] = await this.root.execute('playground.inc', data)
        return output
    }

    /**
     * Returns the sum of three integers
     *
     * No authentication
     * No warnings
     *
     */
    async add3i(data: { a: number; b: number; c: number }): Promise<number> {
        const [output, ofiles] = await this.root.execute('playground.add3i', data)
        return output
    }

    /**
     * Returns a type with defaults
     *
     * No authentication
     * No warnings
     *
     */
    async something(data: SomeType): Promise<SomeType> {
        const [output, ofiles] = await this.root.execute('playground.something', data)
        return output
    }
}
