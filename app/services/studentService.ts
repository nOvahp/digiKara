
import { ordersService } from './orders/ordersService';
import { studentService as profileService } from './student/studentService';

// Merge services for backward compatibility
export const studentService = {
    ...ordersService,
    ...profileService
};

export type { Order } from './orders/ordersService';
