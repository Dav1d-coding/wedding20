import { CinematicHero } from "@/components/CinematicHero";
import { EditorialIntro } from "@/components/EditorialIntro";
import { RegistrationDay } from "@/components/RegistrationDay";
import { DayBlock } from "@/components/DayBlock";
import { DressCode } from "@/components/DressCode";
import { RsvpForm } from "@/components/RsvpForm";
import { Finale } from "@/components/Finale";
import { SparkParticles } from "@/components/SparkParticles";
import { AfterHeroParticles } from "@/components/AfterHeroParticles";

export default function Home() {
  return (
    <main>
      <CinematicHero />

      <AfterHeroParticles count={18} />

      <div className="after-hero-shell">
        <EditorialIntro />

        <RegistrationDay />

        <DayBlock
          label="День второй"
          title="Основной день торжества"
          date="09.07.2026"
          text="В этот день мы соберёмся вместе, чтобы разделить самый тёплый и важный вечер нашей истории."
          venueName="Веранда Лес"
          time="16:00"
          latitude="55.872830"
          longitude="49.278228"
          transferNote="Будет организован трансфер. О времени и месте сбора мы сообщим позже."
          organizerName="Виктория"
          organizerPhone="+7-937-623-31-98"
          organizerPhoneHref="+79376233198"
          theme="light"
          showDressCode
          tone="warm"
        />

        <DayBlock
          label="День третий"
          title="Продолжение банкета"
          date="10.07.2026"
          venueName="Коттедж Сибирь"
          time="Время в появится позже"
          latitude="55.884201"
          longitude="49.200108"
          text="В этот день мы соберёмся вместе, чтобы разделить самый тёплый и важный вечер нашей истории."
          tone="warm"
          theme="dark"
        />

        <RsvpForm />

        <Finale
          photos={[
            "/photos/01.png",
            "/photos/02.png",
            "/photos/03.png",
            "/photos/04.png",
          ]}
          vkUrl="https://vk.me/join/XMJPD_ouVAD9tSXuevQnY8SEdaUYRFrPQq8="
        />
      </div>
    </main>
  );
}