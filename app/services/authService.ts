
// Main Auth Logic
// Main Auth Logic
// export { authService } from './auth/auth.service'; // Removed to avoid duplicate export

// Re-export types
export * from './common/schemas';

// DEPRECATED PROXIES - These functions are now in their own domains.
// Please update imports to use { studentService } from '@/app/services/student/student.service' etc.

import { studentService } from './student/studentService';
import { reportService } from './reportService'; // Haven't moved yet, assuming it stays or moves to common

// We extend the authService with these methods for backward compatibility if needed, 
// OR we just assume consumers import 'authService' and call .requestOtp, and import 'studentService' separately.

// Based on original file, authService OBJECT had these methods directly on it.
// To keep compatibility, we must reconstruct the object or export them.

// Re-constructing the mixed object if consumers rely on `authService.verifyNationalId`
import { authService as coreAuth } from './auth/authService';

export const authServiceLegacy = {
    ...coreAuth,
    verifyNationalId: studentService.verifyNationalId,
    getInterests: studentService.getInterests,
    confirmInfo: studentService.confirmInfo,
    addFavorites: studentService.addFavorites,
    reportIssue: reportService.reportIssue,
    changeStudentInfo: studentService.changeStudentInfo,
    saveStudentData: studentService.saveStudentData,
};

// If consumers use `import { authService } from ...`, we should export the legacy mixed one for now.
export { authServiceLegacy as authService };

// Also re-export other services for convenience
export { studentService } from './student/studentService';
export { reportService } from './reportService';
export { studentProductService } from './studentProductService';
