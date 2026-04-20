import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "./lib/supabase";
import {
  Building2,
  Briefcase,
  Car,
  Copy,
  Download,
  Factory,
  FilePenLine,
  FileText,
  GraduationCap,
  HardHat,
  HeartPulse,
  Home,
  Languages,
  LayoutGrid,
  LayoutTemplate,
  Megaphone,
  Monitor,
  Moon,
  Music4,
  PaintBucket,
  Save,
  Search,
  Sparkles,
  Store,
  Sun,
  Tractor,
  Trash2,
  Truck,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";

const sectorConfig = {
  Agropecuária: {
    accent: "#4d7c0f",
    image:
      "https://images.pexels.com/photos/1300375/pexels-photo-1300375.jpeg?auto=compress&cs=tinysrgb&w=1600",
    icon: Tractor,
  },
  Alimentação: {
    accent: "#b56b2e",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
    icon: UtensilsCrossed,
  },
  "Ambiente & Segurança": {
    accent: "#3f7f6b",
    image:
      "https://loaltgomeorjpmhdxzsy.supabase.co/storage/v1/object/public/cover-assets/seguranca%20no%20trabalho.jpg",
    icon: HardHat,
  },
  Arquitetura: {
    accent: "#0f766e",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    icon: Home,
  },
  Automóvel: {
    accent: "#2563eb",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
    icon: Car,
  },
  Comércio: {
    accent: "#2563eb",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    icon: Store,
  },
  Consultoria: {
    accent: "#0f766e",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    icon: Briefcase,
  },
  Construção: {
    accent: "#c57a2d",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
    icon: HardHat,
  },
  Contabilidade: {
    accent: "#1f5fae",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    icon: Briefcase,
  },
  "Educação e Media": {
    accent: "#0284c7",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
    icon: GraduationCap,
  },
  "Eventos e Cultura": {
    accent: "#ea580c",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
    icon: Megaphone,
  },
  Funerárias: {
    accent: "#7a6a8c",
    image:
      "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1600&q=80",
    icon: HeartPulse,
  },
  "Hotelaria & Turismo": {
    accent: "#0ea5a4",
    image:
      "https://pjubouhfowmcqlspyoaz.supabase.co/storage/v1/object/public/assets/mindelo-port-marina-2.webp",
    icon: Home,
  },
  Imobiliária: {
    accent: "#c8792a",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    icon: Building2,
  },
  Indústria: {
    accent: "#475569",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=80",
    icon: Factory,
  },
  Informática: {
    accent: "#1f5fae",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    icon: Monitor,
  },
  "Logística e Transporte": {
    accent: "#cb6b2a",
    image:
      "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1600&q=80",
    icon: Truck,
  },
  Marcenaria: {
    accent: "#92400e",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80",
    icon: Wrench,
  },
  "Medicina Alternativa": {
    accent: "#5f8f7b",
    image:
      "https://pjubouhfowmcqlspyoaz.supabase.co/storage/v1/object/public/assets/acunpuntura.jpg",
    icon: HeartPulse,
  },
  Merchandising: {
    accent: "#db2777",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
    icon: Store,
  },
  Outro: {
    accent: "#4f46e5",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
    icon: LayoutTemplate,
  },
  "Pastelarias & Restauração": {
    accent: "#c26a3d",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    icon: UtensilsCrossed,
  },
  "Produção Musical": {
    accent: "#7c3aed",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80",
    icon: Music4,
  },
  Saúde: {
    accent: "#2f8f5b",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    icon: HeartPulse,
  },
  Tradução: {
    accent: "#7c3aed",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
    icon: Languages,
  },
  "Viagens & Turismo": {
    accent: "#0ea5a4",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    icon: Home,
  },
} as const;

const ACCOUNTING_LOGOS = {
  branco:
    "https://pjubouhfowmcqlspyoaz.supabase.co/storage/v1/object/public/assets/logo_vc_branco.png",
  dourado:
    "https://pjubouhfowmcqlspyoaz.supabase.co/storage/v1/object/public/assets/Logo_vc_dourado_.png",
  preto:
    "https://pjubouhfowmcqlspyoaz.supabase.co/storage/v1/object/public/assets/logo_vc_preto.png",
} as const;

const KZO_COPYRIGHT_LOGO =
  "https://pjubouhfowmcqlspyoaz.supabase.co/storage/v1/object/public/assets/5b46d079-3392-4aa1-bee4-b5814ee8f99a_KZO_LOGO.png";

type SectorKey = keyof typeof sectorConfig;
type SectorValue = SectorKey | "";
type AccountingLogoKey = keyof typeof ACCOUNTING_LOGOS;
type ThemeMode = "light" | "dark";

type FormState = {
  companyName: string;
  year: string;
  nif: string;
  address: string;
  phone: string;
  email: string;
  sector: SectorValue;
  accountingFirm: string;
  accountingLogo: AccountingLogoKey;
  themeMode: ThemeMode;
};

type SavedCover = {
  id: string;
  name: string;
  form: FormState;
  accentColor: string;
  logoUrl: string;
  logoName: string;
  createdAt: string;
  updatedAt: string;
};

const initialForm: FormState = {
  companyName: "",
  year: "",
  nif: "",
  address: "",
  phone: "",
  email: "",
  sector: "",
  accountingFirm: "VC Contabilidade & Serviços",
  accountingLogo: "branco",
  themeMode: "light",
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatDateTime(dateIso: string) {
  const d = new Date(dateIso);
  return d.toLocaleString();
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

function getAverageColorFromImage(imgEl: HTMLImageElement): string | null {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  const w = 60;
  const h = 60;
  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(imgEl, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha < 120) continue;

    const rr = data[i];
    const gg = data[i + 1];
    const bb = data[i + 2];
    const brightness = (rr + gg + bb) / 3;
    if (brightness > 245) continue;

    r += rr;
    g += gg;
    b += bb;
    count += 1;
  }

  if (!count) return null;
  return rgbToHex(r / count, g / count, b / count);
}

function ColorSwatch({
  color,
  onUse,
}: {
  color: string;
  onUse: (color: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onUse(color)}
      className="h-8 w-8 rounded-lg border border-slate-300 shadow-sm"
      style={{ backgroundColor: color }}
      title={color}
    />
  );
}

function Field({
  label,
  children,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

function Card({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
        <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function DotGrid({
  count,
  columns,
  gap,
  dotSize,
  color,
  className = "",
}: {
  count: number;
  columns: number;
  gap: string;
  dotSize: string;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap,
      }}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <span
          key={idx}
          className="rounded-full"
          style={{ width: dotSize, height: dotSize, backgroundColor: color }}
        />
      ))}
    </div>
  );
}

function TopRightTriangles({
  color,
  darkMode,
}: {
  color: string;
  darkMode: boolean;
}) {
  const outlineColor = darkMode ? "#ffffff" : "#111111";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 301.5 322.5"
      aria-hidden="true"
      className="pointer-events-none absolute right-[-95px] top-[-70px] z-20 h-[320px] w-[300px] max-w-none overflow-visible"
    >
      <defs>
        <clipPath id="tr-a">
          <path d="M 52.167969 118.5625 L 157.519531 118.5625 L 157.519531 236.359375 L 52.167969 236.359375 Z M 52.167969 118.5625 " />
        </clipPath>
        <clipPath id="tr-b">
          <path d="M 152.964844 184.796875 L 65.171875 234.964844 C 62.480469 236.5 59.175781 236.488281 56.496094 234.933594 C 53.816406 233.378906 52.167969 230.515625 52.167969 227.417969 L 52.167969 127.316406 C 52.167969 124.21875 53.816406 121.351562 56.496094 119.796875 C 59.175781 118.242188 62.480469 118.230469 65.171875 119.769531 L 152.964844 169.9375 C 155.628906 171.460938 157.273438 174.296875 157.273438 177.367188 C 157.273438 180.4375 155.628906 183.273438 152.964844 184.796875 Z M 152.964844 184.796875 " />
        </clipPath>
        <clipPath id="tr-c">
          <path d="M 0.167969 0.5625 L 105.417969 0.5625 L 105.417969 118.359375 L 0.167969 118.359375 Z M 0.167969 0.5625 " />
        </clipPath>
        <clipPath id="tr-d">
          <path d="M 100.964844 66.796875 L 13.171875 116.964844 C 10.480469 118.5 7.175781 118.488281 4.496094 116.933594 C 1.816406 115.378906 0.167969 112.515625 0.167969 109.417969 L 0.167969 9.316406 C 0.167969 6.21875 1.816406 3.351562 4.496094 1.796875 C 7.175781 0.242188 10.480469 0.230469 13.171875 1.769531 L 100.964844 51.9375 C 103.628906 53.460938 105.273438 56.296875 105.273438 59.367188 C 105.273438 62.4375 103.628906 65.273438 100.964844 66.796875 Z M 100.964844 66.796875 " />
        </clipPath>
        <clipPath id="tr-e">
          <rect x="0" width="106" y="0" height="119" />
        </clipPath>
        <clipPath id="tr-f">
          <path d="M 125.453125 9.054688 L 231 9.054688 L 231 126.90625 L 125.453125 126.90625 Z M 125.453125 9.054688 " />
        </clipPath>
        <clipPath id="tr-g">
          <path d="M 226.238281 75.410156 L 138.453125 125.570312 C 135.761719 127.109375 132.460938 127.097656 129.78125 125.542969 C 127.101562 123.988281 125.453125 121.125 125.453125 118.027344 L 125.453125 17.929688 C 125.453125 14.832031 127.101562 11.96875 129.78125 10.414062 C 132.460938 8.859375 135.761719 8.851562 138.453125 10.386719 L 226.238281 60.550781 C 228.90625 62.074219 230.550781 64.910156 230.550781 67.980469 C 230.550781 71.050781 228.90625 73.886719 226.238281 75.410156 Z M 226.238281 75.410156 " />
        </clipPath>
        <clipPath id="tr-h">
          <path d="M 8.449219 6.042969 L 113.800781 6.042969 L 113.800781 123.839844 L 8.449219 123.839844 Z M 8.449219 6.042969 " />
        </clipPath>
        <clipPath id="tr-i">
          <path d="M 13.003906 57.609375 L 100.796875 7.441406 C 103.488281 5.902344 106.792969 5.914062 109.472656 7.46875 C 112.148438 9.023438 113.800781 11.890625 113.800781 14.988281 L 113.800781 115.089844 C 113.800781 118.1875 112.148438 121.050781 109.472656 122.605469 C 106.792969 124.160156 103.488281 124.171875 100.796875 122.636719 L 13.003906 72.46875 C 10.339844 70.945312 8.691406 68.109375 8.691406 65.039062 C 8.691406 61.96875 10.339844 59.132812 13.003906 57.609375 Z M 13.003906 57.609375 " />
        </clipPath>
        <clipPath id="tr-j">
          <path d="M 0.625 0.0429688 L 105.800781 0.0429688 L 105.800781 117.839844 L 0.625 117.839844 Z M 0.625 0.0429688 " />
        </clipPath>
        <clipPath id="tr-k">
          <path d="M 5.003906 51.609375 L 92.796875 1.441406 C 95.488281 -0.0976562 98.792969 -0.0859375 101.472656 1.46875 C 104.148438 3.023438 105.800781 5.890625 105.800781 8.988281 L 105.800781 109.089844 C 105.800781 112.1875 104.148438 115.050781 101.472656 116.605469 C 98.792969 118.160156 95.488281 118.171875 92.796875 116.636719 L 5.003906 66.46875 C 2.339844 64.945312 0.691406 62.109375 0.691406 59.039062 C 0.691406 55.96875 2.339844 53.132812 5.003906 51.609375 Z M 5.003906 51.609375 " />
        </clipPath>
        <clipPath id="tr-l">
          <rect x="0" width="106" y="0" height="118" />
        </clipPath>
        <clipPath id="tr-m">
          <path d="M 69 192.808594 L 174.46875 192.808594 L 174.46875 310.660156 L 69 310.660156 Z M 69 192.808594 " />
        </clipPath>
        <clipPath id="tr-n">
          <path d="M 73.683594 244.304688 L 161.46875 194.140625 C 164.160156 192.605469 167.460938 192.617188 170.140625 194.171875 C 172.820312 195.726562 174.46875 198.589844 174.46875 201.6875 L 174.46875 301.78125 C 174.46875 304.878906 172.820312 307.742188 170.140625 309.296875 C 167.460938 310.851562 164.160156 310.863281 161.46875 309.328125 L 73.683594 259.164062 C 71.015625 257.640625 69.371094 254.804688 69.371094 251.734375 C 69.371094 248.664062 71.015625 245.828125 73.683594 244.304688 Z M 73.683594 244.304688 " />
        </clipPath>
        <clipPath id="tr-o">
          <path d="M 186.617188 197.578125 L 291.96875 197.578125 L 291.96875 315.375 L 186.617188 315.375 Z M 186.617188 197.578125 " />
        </clipPath>
        <clipPath id="tr-p">
          <path d="M 287.414062 263.8125 L 199.621094 313.976562 C 196.929688 315.515625 193.625 315.503906 190.949219 313.949219 C 188.269531 312.394531 186.617188 309.53125 186.617188 306.433594 L 186.617188 206.328125 C 186.617188 203.230469 188.269531 200.367188 190.949219 198.8125 C 193.625 197.257812 196.929688 197.246094 199.621094 198.785156 L 287.414062 248.953125 C 290.078125 250.476562 291.726562 253.308594 291.726562 256.382812 C 291.726562 259.453125 290.078125 262.289062 287.414062 263.8125 Z M 287.414062 263.8125 " />
        </clipPath>
        <clipPath id="tr-q">
          <path d="M 0.617188 0.578125 L 105.835938 0.578125 L 105.835938 118.375 L 0.617188 118.375 Z M 0.617188 0.578125 " />
        </clipPath>
        <clipPath id="tr-r">
          <path d="M 101.414062 66.8125 L 13.621094 116.976562 C 10.929688 118.515625 7.625 118.503906 4.949219 116.949219 C 2.269531 115.394531 0.617188 112.53125 0.617188 109.433594 L 0.617188 9.328125 C 0.617188 6.230469 2.269531 3.367188 4.949219 1.8125 C 7.625 0.257812 10.929688 0.246094 13.621094 1.785156 L 101.414062 51.953125 C 104.078125 53.476562 105.726562 56.308594 105.726562 59.382812 C 105.726562 62.453125 104.078125 65.289062 101.414062 66.8125 Z M 101.414062 66.8125 " />
        </clipPath>
        <clipPath id="tr-s">
          <rect x="0" width="106" y="0" height="119" />
        </clipPath>
      </defs>
      <g clipPath="url(#tr-a)">
        <g clipPath="url(#tr-b)">
          <g transform="translate(52 118)">
            <g clipPath="url(#tr-e)">
              <g clipPath="url(#tr-c)">
                <g clipPath="url(#tr-d)">
                  <path
                    fill={color}
                    d="M 113.964844 -5.660156 L 113.964844 124.582031 L 0.167969 124.582031 L 0.167969 -5.660156 Z M 113.964844 -5.660156 "
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      <g clipPath="url(#tr-f)">
        <g clipPath="url(#tr-g)">
          <path
            fill="none"
            stroke={color}
            strokeWidth="8"
            d="M 226.211609 75.398376 L 138.470622 125.587042 C 135.742392 127.1473 132.393208 127.135846 129.677355 125.557788 C 126.961502 123.97973 125.28691 121.072708 125.28691 117.929168 L 125.28691 17.798555 C 125.28691 14.655014 126.961502 11.747993 129.677355 10.169935 C 132.393208 8.591877 135.742392 8.583423 138.470622 10.14268 L 226.211609 60.331347 C 228.916835 61.878335 230.584336 64.757724 230.584336 67.864861 C 230.584336 70.971998 228.916835 73.851388 226.211609 75.398376 Z"
          />
        </g>
      </g>
      <g clipPath="url(#tr-h)">
        <g clipPath="url(#tr-i)">
          <g transform="translate(8 6)">
            <g clipPath="url(#tr-l)">
              <g clipPath="url(#tr-j)">
                <g clipPath="url(#tr-k)">
                  <path
                    fill="#16293d"
                    d="M -7.996094 124.066406 L -7.996094 -6.179688 L 105.800781 -6.179688 L 105.800781 124.066406 Z M -7.996094 124.066406 "
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      <g clipPath="url(#tr-m)">
        <g clipPath="url(#tr-n)">
          <path
            fill="none"
            stroke={outlineColor}
            strokeWidth="8"
            d="M 73.711781 244.292831 L 161.452768 194.104165 C 164.181 192.544907 167.530182 192.553362 170.246035 194.13142 C 172.961888 195.709478 174.636479 198.616499 174.636479 201.76004 L 174.636479 301.890653 C 174.636479 305.034193 172.961888 307.941215 170.246035 309.519273 C 167.530182 311.097331 164.181 311.108785 161.452768 309.548527 L 73.711781 259.359861 C 71.006556 257.812873 69.339054 254.933484 69.339054 251.826347 C 69.339054 248.71921 71.006556 245.83982 73.711781 244.292831 Z"
          />
        </g>
      </g>
      <g clipPath="url(#tr-o)">
        <g clipPath="url(#tr-p)">
          <g transform="translate(186 197)">
            <g clipPath="url(#tr-s)">
              <g clipPath="url(#tr-q)">
                <g clipPath="url(#tr-r)">
                  <path
                    fill={color}
                    d="M 114.414062 -5.644531 L 114.414062 124.597656 L 0.617188 124.597656 L 0.617188 -5.644531 Z M 114.414062 -5.644531 "
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default function App() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [logoDataUrl, setLogoDataUrl] = useState("");
  const [logoName, setLogoName] = useState("");
  const [accentColor, setAccentColor] = useState<string>("#1f5fae");
  const [autoExtractLogoColor, setAutoExtractLogoColor] = useState(false);
  const [isCustomColorLocked, setIsCustomColorLocked] = useState(false);
  const [eyeDropperError, setEyeDropperError] = useState("");
  const [coverVersion, setCoverVersion] = useState(0);
  const [gallery, setGallery] = useState<SavedCover[]>([]);
  const [coverName, setCoverName] = useState("");
  const [activeCoverId, setActiveCoverId] = useState<string | null>(null);
  const [gallerySearch, setGallerySearch] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const logoProbeRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadGallery = async () => {
      const { data, error } = await supabase
        .from("covers")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar galeria:", error);
        setSaveMessage(`Erro ao carregar galeria: ${error.message}`);
        return;
      }

      const mapped: SavedCover[] = (data || []).map((item) => ({
        id: item.id,
        name: item.name,
        form: item.form as FormState,
        accentColor: item.accent_color,
        logoUrl: item.logo_url || "",
        logoName: item.logo_name || "",
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));

      setGallery(mapped);
    };

    loadGallery();
  }, []);

  useEffect(() => {
    if (!saveMessage) return;
    const timer = window.setTimeout(() => setSaveMessage(""), 2400);
    return () => window.clearTimeout(timer);
  }, [saveMessage]);

  const selectedSector = useMemo(
    () => (form.sector ? sectorConfig[form.sector as SectorKey] : null),
    [form.sector],
  );
  const selectedAccountingLogo = ACCOUNTING_LOGOS[form.accountingLogo];
  const isDarkMode = form.themeMode === "dark";

  const filteredGallery = useMemo(() => {
    const q = gallerySearch.trim().toLowerCase();
    const base = [...gallery].sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt),
    );
    if (!q) return base;
    return base.filter((item) => {
      const haystack = [
        item.name,
        item.form.companyName,
        item.form.year,
        item.form.sector,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [gallery, gallerySearch]);

  const uiFieldClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500";
  const uiPanelClass = "border-slate-200 bg-slate-50";
  const uiSubtleTextClass = "text-slate-500";
  const uiPreviewCardClass = "border-slate-200 bg-white";
  const uploadAreaClass =
    "border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-slate-100";
  const smallInfoBoxClass = "border-slate-200 bg-white text-slate-600";
  const coverBaseBg = isDarkMode ? "#0f172a" : "#f5f3ee";
  const coverFooterBg = isDarkMode ? "#020617" : "#16293d";
  const coverTextPrimary = isDarkMode ? "#f8fafc" : coverFooterBg;
  const coverTextSecondary = isDarkMode
    ? "rgba(226,232,240,0.9)"
    : "rgba(51,65,85,0.9)";

  const handleChange = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const processLogoFile = async (file?: File) => {
    if (!file) return;

    setLogoName(file.name);
    setAutoExtractLogoColor(!isCustomColorLocked);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("cover-assets")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Erro upload:", uploadError);
        setSaveMessage(`Erro upload: ${uploadError.message}`);
        return;
      }

      const { data } = supabase.storage
        .from("cover-assets")
        .getPublicUrl(filePath);

      setLogoDataUrl(data.publicUrl);
    } catch (err) {
      console.error("Erro geral:", err);
      setSaveMessage("Erro ao processar logo");
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    await processLogoFile(file);
  };

  const handleDrop = async (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    await processLogoFile(file);
  };

  const handleLogoProbeLoad = () => {
    if (!logoProbeRef.current || !autoExtractLogoColor) return;
    const extracted = getAverageColorFromImage(logoProbeRef.current);
    if (extracted && !isCustomColorLocked) setAccentColor(extracted);
    setAutoExtractLogoColor(false);
  };

  const clearLogo = () => {
    setAutoExtractLogoColor(false);
    setLogoDataUrl("");
    setLogoName("");
    if (!isCustomColorLocked)
      setAccentColor(selectedSector ? selectedSector.accent : "#1f5fae");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetCover = () => {
    setForm({ ...initialForm });
    setAutoExtractLogoColor(false);
    setLogoDataUrl("");
    setLogoName("");
    setAccentColor("#1f5fae");
    setIsCustomColorLocked(false);
    setEyeDropperError("");
    setCoverVersion((prev) => prev + 1);
    setActiveCoverId(null);
    setCoverName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const loadSavedCover = (item: SavedCover) => {
    setForm(item.form);
    setAutoExtractLogoColor(false);
    setLogoDataUrl(item.logoUrl || "");
    setLogoName(item.logoName || "");
    setAccentColor(item.accentColor);
    setIsCustomColorLocked(true);
    setActiveCoverId(item.id);
    setCoverName(item.name);
    setCoverVersion((prev) => prev + 1);
    setSaveMessage(`Capa “${item.name}” carregada.`);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const buildCoverPayload = (existingId?: string): SavedCover | null => {
    const safeName = coverName.trim();
    if (!safeName) {
      setSaveMessage("Dá um nome à capa primeiro.");
      return null;
    }
    const now = new Date().toISOString();
    const current = existingId
      ? gallery.find((item) => item.id === existingId)
      : null;
    return {
      id: existingId || makeId(),
      name: safeName,
      form: { ...form },
      accentColor,
      logoUrl: logoDataUrl,
      logoName,
      createdAt: current?.createdAt || now,
      updatedAt: now,
    };
  };

  const handleSaveNew = async () => {
    const payload = buildCoverPayload();
    if (!payload) return;

    const { data, error } = await supabase
      .from("covers")
      .insert({
        name: payload.name,
        form: payload.form,
        accent_color: payload.accentColor,
        logo_url: payload.logoUrl,
        logo_name: payload.logoName,
      })
      .select()
      .single();

    if (error) {
      console.error("Erro ao guardar capa:", error);
      setSaveMessage(`Erro ao guardar: ${error.message}`);
      return;
    }

    const saved: SavedCover = {
      id: data.id,
      name: data.name,
      form: data.form as FormState,
      accentColor: data.accent_color,
      logoUrl: data.logo_url || "",
      logoName: data.logo_name || "",
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    setGallery((prev) => [saved, ...prev]);
    setActiveCoverId(saved.id);
    setSaveMessage(`Capa “${saved.name}” guardada na Galeria.`);
  };

  const handleUpdateExisting = async () => {
    if (!activeCoverId) {
      await handleSaveNew();
      return;
    }

    const payload = buildCoverPayload(activeCoverId);
    if (!payload) return;

    const { data, error } = await supabase
      .from("covers")
      .update({
        name: payload.name,
        form: payload.form,
        accent_color: payload.accentColor,
        logo_url: payload.logoUrl,
        logo_name: payload.logoName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", activeCoverId)
      .select()
      .single();

    if (error) {
      console.error("Erro ao atualizar capa:", error);
      setSaveMessage(`Erro ao atualizar: ${error.message}`);
      return;
    }

    const updated: SavedCover = {
      id: data.id,
      name: data.name,
      form: data.form as FormState,
      accentColor: data.accent_color,
      logoUrl: data.logo_url || "",
      logoName: data.logo_name || "",
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    setGallery((prev) =>
      prev.map((item) => (item.id === activeCoverId ? updated : item)),
    );
    setSaveMessage(`Capa “${updated.name}” atualizada.`);
  };

  const handleDuplicate = async (item: SavedCover) => {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("covers")
      .insert({
        name: `${item.name} - cópia`,
        form: item.form,
        accent_color: item.accentColor,
        logo_url: item.logoUrl,
        logo_name: item.logoName,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      console.error("Erro ao duplicar capa:", error);
      setSaveMessage(`Erro ao duplicar: ${error.message}`);
      return;
    }

    const copy: SavedCover = {
      id: data.id,
      name: data.name,
      form: data.form as FormState,
      accentColor: data.accent_color,
      logoUrl: data.logo_url || "",
      logoName: data.logo_name || "",
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    setGallery((prev) => [copy, ...prev]);
    setSaveMessage(`Capa “${item.name}” duplicada.`);
  };

  const handleDelete = async (itemId: string) => {
    const target = gallery.find((item) => item.id === itemId);

    const { error } = await supabase.from("covers").delete().eq("id", itemId);

    if (error) {
      console.error("Erro ao apagar capa:", error);
      setSaveMessage(`Erro ao apagar: ${error.message}`);
      return;
    }

    setGallery((prev) => prev.filter((item) => item.id !== itemId));
    if (activeCoverId === itemId) {
      resetCover();
    }
    if (target) setSaveMessage(`Capa “${target.name}” apagada.`);
  };

  const handlePrint = () => window.print();

  const handleEyeDropper = async () => {
    setEyeDropperError("");
    try {
      if (!("EyeDropper" in window)) {
        setEyeDropperError("O eyedropper não é suportado neste browser.");
        return;
      }

      const eyeDropper = new (
        window as Window & {
          EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> };
        }
      ).EyeDropper();

      const result = await eyeDropper.open();
      if (result?.sRGBHex) {
        setAccentColor(result.sRGBHex);
        setIsCustomColorLocked(true);
      }
    } catch (error) {
      if ((error as Error)?.name !== "AbortError") {
        setEyeDropperError("Não foi possível capturar a cor.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] font-[Montserrat] text-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            overflow: hidden !important;
          }
          .no-print { display: none !important; }
          .print-shell {
            display: block !important;
            width: 210mm !important;
            height: 297mm !important;
            max-width: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .cover-print-wrap {
            display: block !important;
            width: 210mm !important;
            height: 297mm !important;
            padding: 0 !important;
            margin: 0 !important;
            border: 0 !important;
            box-shadow: none !important;
            background: transparent !important;
          }
          .cover-page {
            width: 210mm !important;
            height: 297mm !important;
            max-width: none !important;
            aspect-ratio: auto !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: hidden !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      <header className="no-print sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-4">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-orange-500 p-3 text-white shadow-sm">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Gerador de Capas 2.0
              </h1>
              <p className="text-sm text-slate-500">
                Nova capa + Galeria de Capas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveMessage ? (
              <span className="text-sm text-slate-500">{saveMessage}</span>
            ) : null}
            <button
              onClick={resetCover}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              Nova capa
            </button>
          </div>
        </div>
      </header>

      <div className="print-shell mx-auto grid max-w-[1680px] gap-6 p-5 lg:grid-cols-[360px_380px_minmax(0,1fr)]">
        <div className="no-print col-span-full">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="text-[14px] text-slate-600">
              <span className="font-medium text-slate-800">Dica:</span>{" "}
              Configura a capa, vê a pré-visualização e só no fim guarda na
              Galeria.
            </div>
          </div>
        </div>
        <aside className="no-print space-y-4 sticky top-[90px] h-fit self-start">
          <div className="text-xs text-slate-400 px-1">
            Passo 1: Configurar dados
          </div>

          <Card title="Dados da Empresa" icon={FileText}>
            <div className="mb-2 text-xs text-slate-500">
              Informação essencial da empresa
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Nome da empresa" required>
                  <input
                    className={uiFieldClass}
                    value={form.companyName}
                    onChange={(e) =>
                      handleChange("companyName", e.target.value)
                    }
                  />
                </Field>
                <Field label="NIF" required>
                  <input
                    className={uiFieldClass}
                    value={form.nif}
                    onChange={(e) => handleChange("nif", e.target.value)}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Ano do relatório" required>
                  <input
                    className={uiFieldClass}
                    value={form.year}
                    onChange={(e) => handleChange("year", e.target.value)}
                  />
                </Field>
                <Field label="Telefone" required>
                  <input
                    className={uiFieldClass}
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Email" required>
                  <input
                    className={uiFieldClass}
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </Field>
                <div />
              </div>

              <Field label="Morada" required>
                <textarea
                  className={`${uiFieldClass} min-h-20`}
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </Field>
            </div>
          </Card>

          <Card title="Setor" icon={LayoutTemplate}>
            <div className="mb-2 text-xs text-slate-500">
              Define o estilo visual automaticamente
            </div>
            <div className="space-y-3">
              <p className={`text-sm ${uiSubtleTextClass}`}>
                Escolhe o ramo para trocar o fundo automaticamente.
              </p>
              <Field label="Ramo de atividade" required>
                <select
                  className={uiFieldClass}
                  value={form.sector}
                  onChange={(e) => {
                    const next = e.target.value as SectorValue;
                    handleChange("sector", next);
                    if (next && !isCustomColorLocked)
                      setAccentColor(sectorConfig[next as SectorKey].accent);
                  }}
                >
                  <option value="">Selecionar setor</option>
                  {Object.keys(sectorConfig).map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </Card>

          <Card title="Logotipo da Empresa" icon={Sparkles}>
            <div className="mb-2 text-xs text-slate-500">
              Carrega o logotipo da empresa (PNG recomendado)
            </div>
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={`flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-8 text-center transition ${uploadAreaClass}`}
              >
                {logoDataUrl ? (
                  <div className="space-y-3">
                    <div className="mx-auto flex h-20 w-40 items-center justify-center rounded-xl bg-white p-3 shadow-sm">
                      <img
                        src={logoDataUrl}
                        alt="Logo do cliente"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="text-sm font-medium text-slate-700">
                      {logoName}
                    </div>
                    <div className={`text-xs ${uiSubtleTextClass}`}>
                      Clique ou arraste outro ficheiro para substituir
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div className="text-sm font-semibold text-slate-700">
                      Carregar logotipo
                    </div>
                    <div className={`text-xs leading-5 ${uiSubtleTextClass}`}>
                      Clique para escolher o ficheiro ou arraste-o para aqui.
                      <br />
                      PNG com fundo transparente é o ideal.
                    </div>
                  </div>
                )}
              </button>

              {logoDataUrl && (
                <>
                  <div
                    className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${smallInfoBoxClass}`}
                  >
                    <span className="truncate">{logoName}</span>
                    <button
                      type="button"
                      onClick={clearLogo}
                      className="font-medium text-slate-500 hover:text-slate-800"
                    >
                      Remover
                    </button>
                  </div>

                  <img
                    ref={logoProbeRef}
                    src={logoDataUrl}
                    alt="Amostra do logo"
                    onLoad={handleLogoProbeLoad}
                    className="hidden"
                    crossOrigin="anonymous"
                  />
                </>
              )}
            </div>
          </Card>

          <Card title="Cor Principal" icon={PaintBucket}>
            <div className="mb-2 text-xs text-slate-500">
              Escolhe ou ajusta a cor principal da capa
            </div>
            <div className="space-y-4">
              <div className={`rounded-xl border p-3 ${uiPanelClass}`}>
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-lg border border-slate-300"
                    style={{ backgroundColor: accentColor }}
                  />
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => {
                      setAccentColor(e.target.value);
                      setIsCustomColorLocked(true);
                    }}
                    className="h-10 w-16 rounded border border-slate-300 bg-transparent p-1"
                  />
                  <span className="text-sm text-slate-600">{accentColor}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleEyeDropper}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                <PaintBucket className="h-4 w-4" />
                Escolher cor com eyedropper
              </button>

              {eyeDropperError && (
                <p className="text-xs text-amber-700">{eyeDropperError}</p>
              )}

              <div className="flex flex-wrap gap-2">
                {[
                  ...(selectedSector ? [selectedSector.accent] : []),
                  "#f97316",
                  "#1d4ed8",
                  "#15803d",
                  "#7c3aed",
                  "#0f766e",
                ].map((color) => (
                  <ColorSwatch
                    key={color}
                    color={color}
                    onUse={(nextColor) => {
                      setAccentColor(nextColor);
                      setIsCustomColorLocked(true);
                    }}
                  />
                ))}
              </div>
            </div>
          </Card>

          <Card title="Tema" icon={isDarkMode ? Moon : Sun}>
            <div className="mb-2 text-xs text-slate-500">
              Escolhe entre versão clara ou escura
            </div>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleChange("themeMode", "light")}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    !isDarkMode
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Sun className="h-4 w-4" />
                  Capa clara
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("themeMode", "dark")}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    isDarkMode
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Moon className="h-4 w-4" />
                  Capa escura
                </button>
              </div>
            </div>
          </Card>

          <Card title="A Empresa que Elabora" icon={Briefcase}>
            <div className="mb-2 text-xs text-slate-500">
              Configuração da entidade responsável
            </div>
            <div className="space-y-4 text-sm text-slate-600">
              <Field label="Logo a usar">
                <select
                  className={uiFieldClass}
                  value={form.accountingLogo}
                  onChange={(e) =>
                    handleChange(
                      "accountingLogo",
                      e.target.value as AccountingLogoKey,
                    )
                  }
                >
                  <option value="branco">VC branco</option>
                  <option value="dourado">VC dourado</option>
                  <option value="preto">VC preto</option>
                </select>
              </Field>

              <div
                className={`flex items-center gap-4 rounded-xl border px-4 py-4 ${uiPanelClass}`}
              >
                <img
                  src={selectedAccountingLogo}
                  alt="VC Logo"
                  className="h-[96px] object-contain"
                />
              </div>

              <p className={`text-xs leading-5 ${uiSubtleTextClass}`}>
                Os logos são carregados diretamente a partir dos links
                configurados no código.
              </p>
            </div>
          </Card>
        </aside>

        <aside className="no-print space-y-4">
          <div className="text-xs text-slate-400 px-1">
            Passo 2: Gerir capas
          </div>
          <Card title="Galeria de Capas" icon={LayoutGrid}>
            <div className="mb-2 text-xs text-slate-500">
              Capas guardadas e reutilizáveis
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none focus:border-slate-500"
                  value={gallerySearch}
                  onChange={(e) => setGallerySearch(e.target.value)}
                  placeholder="Procurar capa guardada"
                />
              </div>

              <div className={`rounded-xl border p-3 ${uiPanelClass}`}>
                <div className="text-sm font-medium text-slate-700">
                  {gallery.length}{" "}
                  {gallery.length === 1 ? "capa guardada" : "capas guardadas"}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Guardadas no Supabase nesta versão 2.0.
                </div>
              </div>

              <div className="max-h-[920px] space-y-3 overflow-auto pr-1">
                {filteredGallery.length ? (
                  filteredGallery.map((item) => {
                    const itemSector = item.form.sector
                      ? sectorConfig[item.form.sector as SectorKey]
                      : null;
                    return (
                      <div
                        key={item.id}
                        className={`rounded-2xl border p-4 shadow-sm ${
                          activeCoverId === item.id
                            ? "border-slate-900 bg-slate-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-slate-900">
                              {item.name}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">
                              {item.form.companyName || "Sem empresa"}
                            </div>
                          </div>
                          <div
                            className="h-5 w-5 shrink-0 rounded-md border border-slate-200"
                            style={{ backgroundColor: item.accentColor }}
                          />
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                          {item.form.year ? (
                            <span className="rounded-full bg-slate-100 px-2 py-1">
                              {item.form.year}
                            </span>
                          ) : null}
                          {item.form.sector ? (
                            <span className="rounded-full bg-slate-100 px-2 py-1">
                              {item.form.sector}
                            </span>
                          ) : null}
                          <span className="rounded-full bg-slate-100 px-2 py-1">
                            {item.form.themeMode === "dark"
                              ? "Capa escura"
                              : "Capa clara"}
                          </span>
                        </div>

                        <div className="mt-3 h-20 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                          <div
                            className="h-full w-full"
                            style={{
                              backgroundImage: itemSector
                                ? `url(${itemSector.image})`
                                : "none",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              opacity: 0.65,
                            }}
                          />
                        </div>

                        <div className="mt-3 text-[11px] leading-5 text-slate-500">
                          Atualizada em {formatDateTime(item.updatedAt)}
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => loadSavedCover(item)}
                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <FilePenLine className="h-4 w-4" />
                            Abrir
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicate(item)}
                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <Copy className="h-4 w-4" />
                            Duplicar
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              loadSavedCover(item);
                              setTimeout(() => window.print(), 80);
                            }}
                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <Download className="h-4 w-4" />
                            PDF
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4" />
                            Apagar
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center">
                    <LayoutGrid className="mx-auto h-8 w-8 text-slate-300" />
                    <div className="mt-3 text-sm font-medium text-slate-700">
                      Galeria vazia
                    </div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">
                      Guarda a primeira capa com nome para começar a tua
                      galeria.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </aside>

        <main className="space-y-4">
          <div className="text-xs text-slate-400 px-1">
            Passo 3: Rever e guardar
          </div>
          <div
            className={`no-print space-y-4 rounded-2xl border px-5 py-4 shadow-sm ${uiPreviewCardClass}`}
          >
            <div className="text-xs text-slate-500">
              Pré-visualização em tempo real
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Pré-visualização
                </h2>
                <p className={`text-sm ${uiSubtleTextClass}`}>
                  Modelo institucional com fundo do setor, cor personalizada e
                  pronto para a Galeria.
                </p>
              </div>
              <button
                onClick={handlePrint}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm"
                style={{ backgroundColor: accentColor }}
              >
                <span className="inline-flex items-center gap-2">
                  <Download className="h-4 w-4" /> Descarregar PDF
                </span>
              </button>
            </div>

            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-end">
              <Field label="Nome da capa" required>
                <input
                  className={uiFieldClass}
                  value={coverName}
                  onChange={(e) => setCoverName(e.target.value)}
                  placeholder="Ex.: Freitas e Fortes 2025"
                />
              </Field>
              <button
                type="button"
                onClick={handleSaveNew}
                className="flex h-[46px] items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              >
                <Save className="h-4 w-4" />
                Guardar
              </button>
              <button
                type="button"
                onClick={handleUpdateExisting}
                className="flex h-[46px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                <FilePenLine className="h-4 w-4" />
                Atualizar
              </button>
            </div>

            <div className={`rounded-xl border p-3 ${uiPanelClass}`}>
              <div className="text-xs uppercase tracking-[0.12em] text-slate-500">
                Estado
              </div>
              <div className="mt-2 text-sm font-medium text-slate-700">
                {activeCoverId
                  ? "A editar capa guardada"
                  : "Nova capa ainda não guardada"}
              </div>
            </div>
          </div>

          <div
            className={`cover-print-wrap flex justify-center rounded-3xl border p-4 shadow-sm ${uiPreviewCardClass}`}
          >
            <div
              key={coverVersion}
              className="cover-page relative aspect-[210/297] w-full max-w-[820px] overflow-hidden rounded-[18px] bg-white"
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: coverBaseBg }}
              />

              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at center, rgba(15,23,42,0.24) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div
                className="absolute inset-x-0 top-0 bottom-[12.5%]"
                style={{
                  backgroundImage: selectedSector
                    ? `url(${selectedSector.image})`
                    : "none",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  opacity: isDarkMode ? 0.42 : 0.52,
                  filter:
                    "blur(0.8px) saturate(0.82) contrast(1.02) brightness(1.04)",
                  transform: "scale(1.04)",
                  transformOrigin: "center",
                }}
              />

              <div
                className="absolute inset-x-0 top-0 bottom-[12.5%]"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.82) 16%, rgba(15,23,42,0.55) 40%, rgba(15,23,42,0.18) 72%, rgba(15,23,42,0.00) 100%)"
                    : "linear-gradient(180deg, rgba(245,243,238,1) 0%, rgba(245,243,238,0.95) 12%, rgba(245,243,238,0.75) 35%, rgba(245,243,238,0.15) 70%, rgba(245,243,238,0.00) 100%)",
                }}
              />

              <div
                className="absolute inset-x-0 top-0 bottom-[12.5%]"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(90deg, rgba(15,23,42,0.98) 0%, rgba(15,23,42,0.9) 24%, rgba(15,23,42,0.7) 45%, rgba(15,23,42,0.2) 74%, rgba(15,23,42,0.04) 100%)"
                    : "linear-gradient(90deg, rgba(245,243,238,0.94) 0%, rgba(245,243,238,0.86) 22%, rgba(245,243,238,0.72) 42%, rgba(245,243,238,0.16) 72%, rgba(245,243,238,0.02) 100%)",
                }}
              />

              <TopRightTriangles color={accentColor} darkMode={isDarkMode} />

              <div className="absolute left-[8%] top-[8%] z-10 max-w-[34%]">
                <div className="mb-3 flex min-h-[58px] items-center">
                  {logoDataUrl ? (
                    <img
                      src={logoDataUrl}
                      alt="Logo empresa"
                      className="max-h-[96px] max-w-[340px] object-contain"
                    />
                  ) : (
                    <div
                      className="text-[clamp(18px,1.8vw,28px)] font-semibold tracking-wide"
                      style={{ color: isDarkMode ? "#f8fafc" : accentColor }}
                    >
                      LOGO
                    </div>
                  )}
                </div>

                <div
                  className="mb-6 max-w-[300px] text-[clamp(16px,1.35vw,24px)] font-semibold leading-[1.15]"
                  style={{ color: coverTextPrimary }}
                >
                  {form.companyName || "NOME DA EMPRESA"}
                </div>

                <div
                  className="whitespace-pre-line text-[clamp(12px,1.05vw,18px)] leading-[1.55]"
                  style={{ color: coverTextSecondary }}
                >
                  {form.address}
                  {form.phone ? `\nTelefone: ${form.phone}` : ""}
                  {form.email ? `\nEmail: ${form.email}` : ""}
                  {form.nif ? `\nNIF ${form.nif}` : ""}
                </div>
              </div>

              <div className="absolute left-[10%] top-[50%] z-10 flex w-[58%] -translate-y-1/2 flex-col items-start">
                <DotGrid
                  count={48}
                  columns={8}
                  gap="7px"
                  dotSize="3px"
                  color={accentColor}
                  className="absolute left-[-88px] top-[4px]"
                />

                <h2
                  className="text-left text-[clamp(66px,6.8vw,126px)] font-semibold uppercase leading-[0.92] tracking-[0.01em]"
                  style={{ color: coverTextPrimary }}
                >
                  RELATÓRIO
                  <br />& CONTAS
                </h2>

                <div className="mt-6 flex items-center gap-0">
                  <div className="flex h-[clamp(44px,4.3vw,62px)] w-fit min-w-[92px] items-center justify-center bg-[#20344a] px-4 text-[clamp(22px,1.9vw,30px)] tracking-[0.18em] text-white">
                    ANO
                  </div>
                  <div
                    className="flex h-[clamp(44px,4.3vw,62px)] w-fit min-w-[96px] items-center justify-center px-4 text-[clamp(28px,2.2vw,38px)] font-semibold text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    {form.year}
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-x-0 bottom-0 h-[12.5%]"
                style={{ backgroundColor: coverFooterBg, opacity: 0.96 }}
              />

              <div className="absolute inset-x-[8%] bottom-0 top-[87.5%] z-20 flex items-center justify-between text-white">
                <div className="flex min-w-0 flex-col justify-center">
                  <div className="mb-2 pl-[2px] text-[clamp(13px,1vw,17px)] leading-none opacity-90">
                    Elaborado por:
                  </div>
                  <img
                    src={selectedAccountingLogo}
                    alt="VC Logo"
                    className="h-[84px] object-contain"
                  />
                </div>

                <div className="max-w-[34%] self-center text-right text-[12px] leading-[1.5] text-white/78">
                  <div className="font-medium uppercase tracking-[0.08em]">
                    {form.accountingFirm}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="no-print border-t border-slate-200 bg-white/95">
        <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4 px-5 py-3 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <img
              src={KZO_COPYRIGHT_LOGO}
              alt="KZO Logo"
              className="h-8 w-auto object-contain opacity-90"
            />
            <span>
              © {new Date().getFullYear()} KZO. Todos os direitos reservados.
            </span>
          </div>
          <span className="text-slate-400">Gerador de Capas 2.0</span>
        </div>
      </footer>
    </div>
  );
}
