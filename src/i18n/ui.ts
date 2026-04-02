export const languages = {
  "zh-CN": "中文",
  en: "English",
};

export const defaultLang = "zh-CN";

export const ui = {
  "zh-CN": {
    "nav.home": "首页",
    "nav.work": "项目",
    "nav.blog": "博客",
    "page.work.title": "项目",
    "page.blog.title": "博客",
  },
  en: {
    "nav.home": "Home",
    "nav.work": "Work",
    "nav.blog": "Blog",
    "page.work.title": "Work",
    "page.blog.title": "Blog",
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
