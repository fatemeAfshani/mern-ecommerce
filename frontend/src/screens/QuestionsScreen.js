import React from "react";

function QuestionsScreen() {
  return (
    <>
      <div className="block flex-row center bigText">سوالات متداول</div>

      <div className="both question">نحوه ارسال کالا به چه صورت است؟</div>
      <div className="both answer">
        تمامی کالا ها با بسته بندی کامل ارسال خواهند شد، در صورت ارسال به تهران
        با پیک در همان روز یا روز بعد کاری و در صورت ارسال برای شهرستان به وسیله
        پست و در سریع ترین زمان بین ۳ تا ۷ روز کاری ارسال خواهد شد.
      </div>

      <div className="both question">
        شرایط مرجوعی کالا ها به چه صورت باید باشد؟
      </div>
      <div className="both answer">
        در صورت داشتن هرگونه سوال در مورد نحوه کار دستگاه یا در صورت داشتن مشکل
        و خرابی دستگاه در زمان مهلت تست ابتدا با بخش پشتیبانی تماس گرفته و در
        صورت تایید خرابی کالا پس گرفته شده و کالای جدید برای شما ارسال خواهد شد.
      </div>
    </>
  );
}

export default QuestionsScreen;
