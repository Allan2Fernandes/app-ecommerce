export interface ToastDTO{
  id: string;
  type: 'info' | 'error' | 'success' | 'warning';
  message: string;
}