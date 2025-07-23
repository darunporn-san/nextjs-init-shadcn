import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jwtDecode } from 'jwt-decode';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function for generating image query string
export function genImageDirectus(w: number, h: number, q: number) {
  return `width=${w}&height=${h}&quality=${q}`;
}

export type SrcSetOption = { w: number; h: number; q: number; ws: string };

// Updated genImgSrcSetDirectus function matching Vue logic
export function genImgSrcSetDirectus(
  pathName: string,
  options: SrcSetOption[] = [{ w: 150, h: 150, q: 90, ws: '150w' }]
): string {
  let srcsets: string[] = [];
  if (options.length > 0) {
    for (const option of options) {
      const query = pathName.includes('?v=') ? `&` : `?`;
      const pathtemp = `${pathName}${query}${genImageDirectus(option.w, option.h, option.q)} ${option.ws}`;
      srcsets = [...srcsets, pathtemp];
    }
  }
  return srcsets.length ? srcsets.join(',') : `${pathName}`;
}

export function decodeToken(token: string) {
  return jwtDecode(token);
}