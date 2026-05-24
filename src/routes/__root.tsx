import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">Страница не найдена.</p>
        <Link to="/" className="mt-6 inline-flex rounded-sm bg-graphite px-5 py-3 text-xs uppercase tracking-[0.15em] text-primary-foreground">На главную</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl">Что-то пошло не так</h1>
        <p className="mt-2 text-sm text-muted-foreground">Попробуйте обновить страницу.</p>
        <button onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex rounded-sm bg-graphite px-5 py-3 text-xs uppercase tracking-[0.15em] text-primary-foreground">
          Обновить
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CITY GEMS — лабораторные бриллианты с сертификатами IGI" },
      { name: "description", content: "Этичные лабораторные бриллианты премиум-класса. Каталог камней с подробными характеристиками 4C и сертификацией." },
      { property: "og:title", content: "CITY GEMS — лабораторные бриллианты с сертификатами IGI" },
      { property: "og:description", content: "Этичные лабораторные бриллианты премиум-класса. Каталог камней с подробными характеристиками 4C и сертификацией." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "CITY GEMS — лабораторные бриллианты с сертификатами IGI" },
      { name: "twitter:description", content: "Этичные лабораторные бриллианты премиум-класса. Каталог камней с подробными характеристиками 4C и сертификацией." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/62eade79-50a4-4d3e-95c2-5f79f4f960f8/id-preview-dabc906c--ddd93c30-279a-4b86-bea7-e2d472d5178e.lovable.app-1779004048124.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/62eade79-50a4-4d3e-95c2-5f79f4f960f8/id-preview-dabc906c--ddd93c30-279a-4b86-bea7-e2d472d5178e.lovable.app-1779004048124.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1"><Outlet /></main>
          <Footer />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
