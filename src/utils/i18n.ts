/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

export function getTranslation(lang: Language) {
  return TRANSLATIONS[lang];
}

export function getDirection(lang: Language) {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
