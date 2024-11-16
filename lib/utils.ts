import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import settings from './settings'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
