// Single source of truth for the restaurant's contact and business-hour info.
// Update here and every page (homepage, 交通資訊, header, dining) stays in sync.

export const PHONE_DISPLAY = "02-2250-0166";
export const PHONE_TEL_HREF = "tel:+886-2-2250-0166";

export const ADDRESS_DISPLAY = "新北市板橋區文聖街131號";

/** LINE 官方帳號（加好友/預約） */
export const LINE_URL = "https://lin.ee/97XgLRz";

export interface BusinessHourSegment {
  label: string;
  time: string;
}

export const BUSINESS_HOURS: BusinessHourSegment[] = [
  { label: "午餐", time: "11:30-14:00" },
  { label: "午茶", time: "14:30-16:30" },
  { label: "晚餐", time: "17:30-20:00" },
];

export const CLOSED_DAYS = "週三、週四";

/** e.g. "午餐 11:30-14:00、午茶 14:30-16:30、晚餐 17:30-20:00" — for prose/SEO. */
export const BUSINESS_HOURS_TEXT = BUSINESS_HOURS.map(
  ({ label, time }) => `${label} ${time}`,
).join("、");
