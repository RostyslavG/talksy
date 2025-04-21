export interface LessonAddDTO {
    id: string;
    lessonCount?: number;
    theme: string;
    desription?: string;
    deadline: Date;
    createdAt?: Date;
    groupId: string;
}
