/**
 * 计算从出生日期到当前时间的年龄
 * @param birthDate 出生日期，格式为 "YYYY-MM-DD"
 * @returns 格式化的年龄字符串
 */
export function calculateAge(birthDate: string, locale: 'zh' | 'en' = 'zh'): string {
  const birth = new Date(birthDate);
  const now = new Date();
  
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  
  // 如果当前月份小于出生月份，年份减1，月份加12
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // 如果当前日期小于出生日期，月份减1
  if (now.getDate() < birth.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }
  
  if (locale === 'zh') {
    // 中文格式：X岁X个月
    if (years === 0) {
      return `${months}个月`;
    } else if (months === 0) {
      return `${years}岁`;
    } else {
      return `${years}岁${months}个月`;
    }
  } else {
    // 英文格式：X years and X months old
    if (years === 0) {
      return months === 1 ? '1 month old' : `${months} months old`;
    } else if (months === 0) {
      return years === 1 ? '1 year old' : `${years} years old`;
    } else {
      const yearStr = years === 1 ? '1 year' : `${years} years`;
      const monthStr = months === 1 ? '1 month' : `${months} months`;
      return `${yearStr} and ${monthStr} old`;
    }
  }
}

/**
 * 获取yibu的出生日期
 */
export const YIBU_BIRTH_DATE = '2021-08-30';
