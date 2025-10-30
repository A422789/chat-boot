// src/hooks/useApi.js

import { useReducer } from 'react';
import axios from 'axios';

// ... (API_KEY, MODEL_NAME, API_URL, initialState, apiReducer - لا تغيير هنا)
const API_KEY = 'AIzaSyAq545Y3o3MGmQGwLOsWvse-bmNv9Mdhk4'; 
const MODEL_NAME = 'gemini-2.5-pro';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const apiReducer = (state, action ) => {
  switch (action.type) {
    case 'API_REQUEST':
      return { ...state, loading: true, error: null };
    case 'API_SUCCESS':
      const responseText = action.payload.candidates[0].content.parts[0].text;
      return { ...state, loading: false, data: responseText };
    case 'API_FAILURE':
      const errorMessage = action.payload?.error?.message || 'An unexpected error occurred';
      return { ...state, loading: false, error: errorMessage };
    default:
      return state;
  }
};


// بناء الخطاف المخصص `useApi`
const useApi = () => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  // --- دالة sendPrompt المحدثة مع منطق إعادة المحاولة ---
  const sendPrompt = async (prompt) => {
    
    // إعدادات إعادة المحاولة
    const maxRetries = 5; // جرب 5 مرات كحد أقصى
    let currentRetry = 0;
    let delay = 1000; // ابدأ بانتظار ثانية واحدة

    // إرسال إجراء بدء الطلب مرة واحدة فقط في البداية
    dispatch({ type: 'API_REQUEST' });

    while (currentRetry < maxRetries) {
      try {
        // بناء الجسم (Body)
        const requestBody = { contents: [{ parts: [{ text: prompt }] }] };

        // تنفيذ الطلب
        const response = await axios.post(API_URL, requestBody);

        // عند النجاح، أرسل البيانات وأخرج من الدالة فورًا
        dispatch({ type: 'API_SUCCESS', payload: response.data });
        return response.data;

      } catch (err) {
        currentRetry++; // زيادة عداد المحاولات

        // تحقق إذا كان الخطأ من الخادم (5xx) وهل ما زال لدينا محاولات
        if (err.response && err.response.status >= 500 && currentRetry < maxRetries) {
          console.warn(`Server error (${err.response.status}). Retrying in ${delay / 1000}s... (Attempt ${currentRetry}/${maxRetries})`);
          
          // انتظر قليلاً قبل المحاولة التالية
          await new Promise(res => setTimeout(res, delay));
          
          // ضاعف مدة الانتظار للمرة القادمة
          delay *= 2; 

        } else {
          // إذا لم يكن خطأ خادم، أو انتهت المحاولات، أفشل بشكل نهائي
          const errorPayload = err.response ? err.response.data : { error: { message: err.message } };
          dispatch({ type: 'API_FAILURE', payload: errorPayload });
          
          // ألقِ الخطأ لإيقاف الحلقة والسماح للمكون بمعالجته
          throw err; 
        }
      }
    }
  };

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    sendPrompt, // اسم الدالة لم يتغير
  };
};

export default useApi;
