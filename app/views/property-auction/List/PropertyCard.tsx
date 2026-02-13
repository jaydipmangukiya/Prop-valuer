/* eslint-disable @next/next/no-img-element */
import { Calendar, MapPin, Home, Building, Ruler, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InterestedModal from "../Form/InterestedModal";
import { formatPriceINR } from "@/lib/utils";
import Image from "next/image";
import NoImageFallback from "@/components/common/NoImageFallback";
import { Button } from "@/components/ui/button";

export default function PropertyCard({ data }: any) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === data.images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.images.length - 1 : prev - 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) nextSlide();
    if (distance < -minSwipeDistance) prevSlide();
  };

  return (
    <>
      <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-slate-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative flex items-center">
            {data.images?.length > 0 ? (
              <div
                className="relative w-full aspect-[4/3] overflow-hidden rounded-xl"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {/* SLIDER IMAGES */}
                <div
                  className="flex h-full transition-transform duration-500"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {data.images.map((img: any, idx: number) => (
                    <div key={idx} className="relative w-full flex-shrink-0">
                      <Image
                        src={img.url}
                        fill
                        className="w-full object-cover rounded-xl"
                        alt={`Property Image ${idx + 1}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      />
                    </div>
                  ))}
                </div>

                {/* LEFT + RIGHT BUTTONS */}
                {data.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full"
                      onClick={prevSlide}
                    >
                      ‹
                    </button>

                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full"
                      onClick={nextSlide}
                    >
                      ›
                    </button>
                  </>
                )}

                {/* PHOTO COUNT BADGE */}
                {data.images.length > 1 && (
                  <span className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-xl">
                    {data.images.length} photos
                  </span>
                )}
              </div>
            ) : (
              // FALLBACK NO IMAGE
              <NoImageFallback
                subtitle={`${data.propertyArea || ""} ${data.city || ""}`}
              />
            )}
          </div>

          <div className="md:w-2/3 md:p-6 p-3 space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-slate-800 leading-snug">
                {data.title}
              </h2>

              <div className="flex items-center gap-3">
                {/* SHARE ICON */}
                <button
                  className="p-2 rounded-full border border-slate-200 hover:bg-slate-100"
                  onClick={async () => {
                    // const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/property-list/${data._id}`;
                    const shareUrl = `/property-list/${data._id}`;

                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: data.title,
                          text: "Check out this property",
                          url: shareUrl,
                        });
                      } catch (err) {
                        console.error("Share cancelled");
                      }
                    } else {
                      await navigator.clipboard.writeText(shareUrl);
                      alert("Link copied!");
                    }
                  }}
                >
                  <Share2 className="h-5 w-5 text-slate-600" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 md:p-4 p-3 rounded-xl">
              <div className="grid grid-cols-2 gap-4 sm:hidden">
                <Info
                  label="Carpet Area"
                  value={data.carpetArea}
                  icon={<Ruler />}
                />
                <Info
                  label="Built-Up Area"
                  value={data.builtUpArea}
                  icon={<Ruler />}
                />
              </div>
              <Info
                label="Carpet Area"
                value={data.carpetArea}
                icon={<Ruler />}
                className="hidden sm:flex"
              />
              <Info
                label="Built-Up Area"
                value={data.builtUpArea}
                icon={<Ruler />}
                className="hidden sm:flex"
              />
              <Info
                label="Type Of Action"
                value={data.actionType}
                icon={<Home />}
              />
              <Info
                label="Possession Status"
                value={data.possessionStatus}
                icon={<Building />}
              />
              <Info label="State" value={data.state} icon={<MapPin />} />
              <Info label="City" value={data.city} icon={<MapPin />} />
              <Info
                label="Location (Area)"
                value={data.propertyArea}
                icon={<MapPin />}
              />
              <Info
                label="Availability Start"
                value={formatDate(data?.auctionDetails?.auctionStart)}
                icon={<Calendar />}
              />
              <Info
                label="Availability End"
                value={formatDate(data?.auctionDetails?.auctionEnd)}
                icon={<Calendar />}
              />
              <Info
                label="EMD End Date"
                value={formatDate(data?.auctionDetails?.emdEnd)}
                icon={<Calendar />}
              />
            </div>

            <div>
              <p className="text-[22px] sm:text-2xl font-bold text-emerald-600">
                {formatPriceINR(data.price)}
                <span className="text-red-600 font-semibold text-sm align-super">
                  **
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <Button
                onClick={() => router.push(`/property-list/${data._id}`)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm"
              >
                View Details
              </Button>
              <Button
                variant={"outline"}
                className="px-5 py-2.5 border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl"
                onClick={() => setOpenModal(true)}
              >
                Interested?
              </Button>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <InterestedModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          propertyId={data._id}
        />
      )}
    </>
  );
}

const Info = ({ label, value, icon, className = "" }: any) => (
  <div className={`flex items-start gap-2 ${className}`}>
    <div className="text-emerald-600 mt-1">{icon}</div>
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-semibold text-slate-700">{value}</p>
    </div>
  </div>
);

const formatDate = (d: string) => {
  return new Date(d).toLocaleString();
};
