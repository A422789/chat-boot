import { useState, useEffect } from 'react';

/**
 
 * @param {string} query 
 * @returns {boolean} - يُرجع true إذا تطابق الشرط، و false إذا لم يتطابق.
 */
const useMediaQuery = (query) => {
  // 1. حالة (state) لتخزين النتيجة (true أو false)
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // 2. نستخدم واجهة المتصفح window.matchMedia للتحقق من الشرط
    const media = window.matchMedia(query);

    // 3. دالة لتحديث الحالة بناءً على نتيجة التحقق
    const updateMatches = () => {
      // إذا كانت نتيجة التحقق الحالية لا تساوي ما هو مخزن في الحالة، قم بالتحديث
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
    };

    // 4. قم بتشغيل الدالة فوراً عند تحميل المكون لأول مرة
    updateMatches();

    // 5. الأهم: أضف "مستمع حدث" (event listener)
    // هذا المستمع سيقوم باستدعاء دالة updateMatches تلقائياً في كل مرة يتغير فيها حجم الشاشة
    media.addEventListener('change', updateMatches);

    // 6. دالة التنظيف (Cleanup Function): مهمة جداً!
    // هذه الدالة تعمل عند إزالة المكون من الشاشة
    // وتقوم بإزالة المستمع لمنع تسريب الذاكرة (memory leaks)
    return () => media.removeEventListener('change', updateMatches);

  }, [query, matches]); // 7. اعتماديات الـ useEffect

  return matches;
};

export default useMediaQuery;
