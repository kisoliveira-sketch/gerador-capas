import React, { useMemo, useRef, useState } from "react";
import {
  Building2,
  Briefcase,
  Car,
  Download,
  Factory,
  FileText,
  GraduationCap,
  HardHat,
  HeartPulse,
  Home,
  Languages,
  LayoutTemplate,
  Megaphone,
  Monitor,
  Moon,
  Music4,
  PaintBucket,
  Sparkles,
  Store,
  Sun,
  Tractor,
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
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
    icon: Megaphone,
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
type AccountingLogoKey = keyof typeof ACCOUNTING_LOGOS;
type ThemeMode = "light" | "dark";

type FormState = {
  companyName: string;
  year: string;
  nif: string;
  address: string;
  phone: string;
  email: string;
  sector: SectorKey;
  accountingFirm: string;
  accountingLogo: AccountingLogoKey;
  themeMode: ThemeMode;
};

const initialForm: FormState = {
  companyName: "",
  year: "",
  nif: "",
  address: "",
  phone: "",
  email: "",
  sector: "Informática",
  accountingFirm: "VC Contabilidade & Serviços",
  accountingLogo: "branco",
  themeMode: "light",
};

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
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
  const [accentColor, setAccentColor] = useState<string>(
    sectorConfig[initialForm.sector].accent,
  );
  const [eyeDropperError, setEyeDropperError] = useState("");
  const [coverVersion, setCoverVersion] = useState(0);

  const logoProbeRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedSector = useMemo(
    () => sectorConfig[form.sector],
    [form.sector],
  );
  const selectedAccountingLogo = ACCOUNTING_LOGOS[form.accountingLogo];
  const isDarkMode = form.themeMode === "dark";

  const uiFieldClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500";
  const uiPanelClass = "border-slate-200 bg-slate-50";
  const uiSubtleTextClass = "text-slate-500";
  const uiPreviewCardClass = "border-slate-200 bg-white";
  const uploadAreaClass =
    "border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-slate-100";
  const smallInfoBoxClass = "border-slate-200 bg-white text-slate-600";
  const coverBaseBg = isDarkMode ? "#0f172a" : "#f5f3ee";
  const coverTextPrimary = isDarkMode ? "#f8fafc" : "#0f172a";
  const coverTextSecondary = isDarkMode
    ? "rgba(226,232,240,0.9)"
    : "rgba(51,65,85,0.9)";
  const coverFooterBg = isDarkMode ? "#020617" : "#16293d";

  const handleChange = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const processLogoFile = async (file?: File) => {
    if (!file) return;
    setLogoName(file.name);
    const dataUrl = await readFileAsDataURL(file);
    setLogoDataUrl(dataUrl);
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
    if (!logoProbeRef.current) return;
    const extracted = getAverageColorFromImage(logoProbeRef.current);
    if (extracted) setAccentColor(extracted);
  };

  const clearLogo = () => {
    setLogoDataUrl("");
    setLogoName("");
    setAccentColor(selectedSector.accent);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetCover = () => {
    setForm({ ...initialForm });
    setLogoDataUrl("");
    setLogoName("");
    setAccentColor(sectorConfig[initialForm.sector].accent);
    setEyeDropperError("");
    setCoverVersion((prev) => prev + 1);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
      if (result?.sRGBHex) setAccentColor(result.sRGBHex);
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
                Gerador de Capas
              </h1>
              <p className="text-sm text-slate-500">Relatórios e Contas</p>
            </div>
          </div>

          <button
            onClick={resetCover}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Nova capa
          </button>
        </div>
      </header>

      <div className="print-shell mx-auto grid max-w-[1480px] gap-6 p-5 lg:grid-cols-[380px_minmax(0,1fr)]">
        <aside className="no-print space-y-4">
          <p className={`px-1 text-[15px] leading-7 ${uiSubtleTextClass}`}>
            Preencha os dados da empresa e gere uma capa institucional limpa e
            pronta para PDF.
          </p>

          <Card title="Dados da Empresa" icon={FileText}>
            <div className="space-y-4">
              <Field label="Nome da empresa" required>
                <input
                  className={uiFieldClass}
                  value={form.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Ano do relatório" required>
                  <input
                    className={uiFieldClass}
                    value={form.year}
                    onChange={(e) => handleChange("year", e.target.value)}
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

              <Field label="Morada" required>
                <textarea
                  className={`${uiFieldClass} min-h-24`}
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Telefone" required>
                  <input
                    className={uiFieldClass}
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    className={uiFieldClass}
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </Field>
              </div>
            </div>
          </Card>

          <Card title="Setor" icon={LayoutTemplate}>
            <div className="space-y-3">
              <p className={`text-sm ${uiSubtleTextClass}`}>
                Escolhe o ramo para trocar o fundo automaticamente.
              </p>
              <Field label="Ramo de atividade" required>
                <select
                  className={uiFieldClass}
                  value={form.sector}
                  onChange={(e) => {
                    const next = e.target.value as SectorKey;
                    handleChange("sector", next);
                    setAccentColor(sectorConfig[next].accent);
                  }}
                >
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
                    onChange={(e) => setAccentColor(e.target.value)}
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
                  selectedSector.accent,
                  "#f97316",
                  "#1d4ed8",
                  "#15803d",
                  "#7c3aed",
                  "#0f766e",
                ].map((color) => (
                  <ColorSwatch
                    key={color}
                    color={color}
                    onUse={setAccentColor}
                  />
                ))}
              </div>
            </div>
          </Card>

          <Card title="Tema" icon={isDarkMode ? Moon : Sun}>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleChange("themeMode", "light" as ThemeMode)
                  }
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
                  onClick={() => handleChange("themeMode", "dark" as ThemeMode)}
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

        <main className="space-y-4">
          <div
            className={`no-print flex items-center justify-between rounded-2xl border px-5 py-4 shadow-sm ${uiPreviewCardClass}`}
          >
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Pré-visualização
              </h2>
              <p className={`text-sm ${uiSubtleTextClass}`}>
                Modelo institucional com fundo do setor e cor retirada do
                logotipo.
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
                  backgroundImage: `url(${selectedSector.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  opacity: isDarkMode ? 0.22 : 0.32,
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
                      LOGO DO CLIENTE
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
        <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-4 px-5 py-3 text-sm text-slate-500">
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
          <span className="text-slate-400">Gerador de Capas</span>
        </div>
      </footer>
    </div>
  );
}
