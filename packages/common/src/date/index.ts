/**
 * 日期时间
 */
export const DateTime = 'YYYY-MM-DD HH:mm:ss';

/**
 * 日期
 */
export const DateOnly = 'YYYY-MM-DD';

/**
 * 时间
 */
export const TimeOnly = 'HH:mm:ss';

/**
 * 时间转秒数
 * @param time 时间字符串
 * @returns
 */
export const timeToSeconds = (time: string) => {
  const [hour, minute, second] = time.split(':').map(Number);
  return hour * 3600 + minute * 60 + second;
};

/**
 * 秒数转时间
 * @param seconds 秒数
 * @returns
 */
export const secondsToTime = (seconds: number) => {
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = Math.floor(seconds % 60);
  return [hour, minute, second].map((n) => String(n).padStart(2, '0')).join(':');
};
