"use client";

import {
  getAuctionPropertyById,
  incrementAuctionPropertyView,
} from "@/app/api/auctionProperty";
import InterestedModal from "@/app/views/property-auction/Form/InterestedModal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getBrowserFingerprint } from "@/lib/getFingerprint";
import {
  Calendar,
  MapPin,
  Building,
  Home,
  FileText,
  Heart,
  Share2,
  Loader2,
  Ruler,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PropertyDetailsPage({ params }: any) {
  const { id } = params;

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    fetchDetails();
    recordView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchDetails = async () => {
    try {
      const res = await getAuctionPropertyById(id);
      setProperty(res);
    } catch (error) {
      console.error("Failed loading:", error);
    } finally {
      setLoading(false);
    }
  };

  const recordView = async () => {
    try {
      const fingerprint = getBrowserFingerprint();

      await incrementAuctionPropertyView(id, { fingerprint });
    } catch (err) {
      console.log("View count failed", err);
    }
  };
  const hasImages = property?.images && property.images.length > 0;

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading && (
          <div className="flex justify-center items-center h-80">
            <Loader2 className="animate-spin h-10 w-10 text-emerald-600" />
          </div>
        )}
        {!loading && !property && (
          <div className="flex justify-center items-center text-center text-red-600 text-xl py-20 h-80">
            Property not found.
          </div>
        )}
        {!loading && property && (
          <>
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 relative">
                  {hasImages ? (
                    <div
                      onClick={() => {
                        setModalIndex(0);
                        setImageModalOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      <Image
                        src={property.images[0].url}
                        className="w-full object-cover rounded-xl"
                        alt="Property Image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      />

                      {property.images.length > 1 && (
                        <span className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-xl">
                          {property.images.length} photos
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full h-72">
                      <Image
                        src="/no-image.jpg"
                        alt="No Image"
                        fill
                        className="object-cover rounded-xl"
                        sizes="100vw"
                      />
                    </div>
                  )}
                </div>

                {/* RIGHT SIDE INFO */}
                <div className="md:w-2/3 space-y-5">
                  <div className="flex justify-between items-start">
                    <h1 className="text-2xl font-bold text-slate-800">
                      {property.title}
                    </h1>

                    <div className="flex items-center gap-3">
                      <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-100">
                        <Heart className="h-5 w-5 text-slate-600" />
                      </button>
                      <button
                        className="p-2 rounded-full border border-slate-200 hover:bg-slate-100"
                        onClick={async () => {
                          // const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/property-auction-list/${data._id}`;
                          const shareUrl = `/property-auction-list/${property._id}`;

                          if (navigator.share) {
                            try {
                              await navigator.share({
                                title: property.title,
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

                  {/* FIELD GRID */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 rounded-xl p-5">
                    <Info
                      label="Carpet Area"
                      value={property.carpetArea}
                      icon={<Ruler />}
                    />
                    <Info
                      label="Built-Up Area"
                      value={property.builtUpArea}
                      icon={<Ruler />}
                    />
                    <Info
                      label="Possession Status"
                      value={property.possessionStatus}
                      icon={<Home />}
                    />
                    <Info
                      label="Type of Action"
                      value={property.actionType}
                      icon={<Building />}
                    />
                    <Info
                      label="State"
                      value={property.state}
                      icon={<MapPin />}
                    />
                    <Info
                      label="City"
                      value={property.city}
                      icon={<MapPin />}
                    />
                    <Info
                      label="Bank"
                      value={property.bankName}
                      icon={<Building />}
                    />
                    <Info
                      label="Auction Start"
                      value={formatDate(property?.auctionDetails?.auctionStart)}
                      icon={<Calendar />}
                    />
                    <Info
                      label="Auction End"
                      value={formatDate(property?.auctionDetails?.auctionEnd)}
                      icon={<Calendar />}
                    />
                    <Info
                      label="End Date"
                      value={formatDate(property?.auctionDetails?.emdEnd)}
                      icon={<Calendar />}
                    />
                  </div>

                  <p className="text-xl font-bold text-emerald-600">
                    {`₹ ${property.price?.toLocaleString()}`}
                    <span className="text-red-600 text-sm align-super font-semibold">
                      **
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow">
                      Contact Us
                    </button>
                    <button
                      className="px-6 py-2.5 border border-emerald-500 text-emerald-600 rounded-xl hover:bg-emerald-50"
                      onClick={() => setOpenModal(true)}
                    >
                      Interested?
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* 2 COLUMN DETAILS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* LEFT SIDE – MORE DETAILS */}
              <div className="md:col-span-2 space-y-6">
                <Section title="More Details">
                  <Details
                    label="Title Deed Type"
                    value={property.titleDeedType}
                  />
                  <Details
                    label="Borrower's Name"
                    value={property.borrowerName}
                  />
                  <Details
                    label="Registered Address of Borrower"
                    value={property.registeredAddressOfBorrower}
                  />
                  <Details
                    label="Co-Borrower's Names"
                    value={property.coBorrowerNames}
                  />
                  <Details
                    label="Ownership Type"
                    value={property.ownershipType}
                  />
                  <Details
                    label="Property Address"
                    value={property.propertyAddress}
                  />
                  <Details label="State" value={property.state} />
                  <Details label="Pin Code" value={property.pinCode} />
                  <Details
                    label="Ownership of Property"
                    value={property.ownershipOfProperty}
                  />
                  <Details label="Facing" value={property.facing} />
                  <Details
                    label="Age of Construction"
                    value={property.ageOfConstruction}
                  />
                  <Details
                    label="Nearest Airport / Railway Station / Bus Stand / Metro Station"
                    value={property.nearestTransportStation}
                  />
                  <Details
                    label="Nearby Educational Institutes"
                    value={property.nearbyEducationalInstitutes}
                  />
                  <Details
                    label="Nearby Shopping Centers"
                    value={property.nearbyShoppingCenters}
                  />
                  <Details
                    label="Nearby Localities"
                    value={property.nearbyLocalities}
                  />
                  <Details
                    label="Nearby Commercial Hub"
                    value={property.nearbyCommercialHub}
                  />
                </Section>

                {/* DOCUMENT DOWNLOAD */}
                <Section title="Document Download">
                  {property.saleNoticePdf?.url ? (
                    <a
                      href={property.saleNoticePdf.url}
                      download={
                        property.saleNoticePdf.originalName || "sale_notice.pdf"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-3 justify-center text-slate-700 cursor-pointer"
                    >
                      <FileText className="h-5 w-5 text-emerald-600" />
                      {property.saleNoticePdf.originalName || "SALE NOTICE"}
                    </a>
                  ) : (
                    <div className="w-full py-3 bg-red-50 text-red-600 rounded-xl text-center text-sm">
                      No Sale Notice PDF Available
                    </div>
                  )}
                </Section>
              </div>

              {/* RIGHT SIDE – AUCTION DETAILS */}
              <div className="space-y-6">
                <Section title="Auction Details">
                  <Details
                    label="Auction ID"
                    value={property?.auctionDetails?.auctionId}
                  />
                  <Details
                    label="Auction Start"
                    value={formatDate(property?.auctionDetails?.auctionStart)}
                  />
                  <Details
                    label="Auction End"
                    value={formatDate(property?.auctionDetails?.auctionStart)}
                  />
                  <Details
                    label="End Date"
                    value={formatDate(property?.auctionDetails?.emdEnd)}
                  />
                  <Details
                    label="EMD"
                    value={`₹ ${property.price?.toLocaleString()}`}
                  />
                  <Details
                    label="Reserve Price"
                    value={`₹ ${property.price?.toLocaleString()}`}
                  />
                </Section>

                <div className="bg-white rounded-xl border border-slate-100 p-6 text-center shadow">
                  <p className="text-slate-600 text-sm">Property Views</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {property?.views}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {imageModalOpen && hasImages && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          {/* MODAL CONTAINER */}
          <div className="relative w-[90%] max-w-4xl rounded-xl overflow-hidden shadow-2xl bg-black">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-3 right-3 z-50 bg-white/80 hover:bg-white text-black rounded-full h-8 w-8 flex items-center justify-center shadow-md"
            >
              ✕
            </button>

            {/* SLIDER WRAPPER */}
            <div className="relative w-full h-[70vh] overflow-hidden bg-white">
              {/* IMAGES */}
              <div
                className="whitespace-nowrap transition-transform duration-500 h-full"
                style={{ transform: `translateX(-${modalIndex * 100}%)` }}
              >
                {property.images.map((img: any, idx: number) => (
                  <Image
                    key={idx}
                    src={img.url}
                    alt={`Slide ${idx + 1}`}
                    width={800}
                    height={600}
                    className="inline-block w-full h-full object-contain"
                  />
                ))}
              </div>

              {/* LEFT ARROW */}
              {property.images.length > 1 && (
                <button
                  onClick={() =>
                    setModalIndex((prev) =>
                      prev === 0 ? property.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black  text-white backdrop-blur-sm h-10 w-10 rounded-full flex items-center justify-center"
                >
                  ‹
                </button>
              )}

              {/* RIGHT ARROW */}
              {property.images.length > 1 && (
                <button
                  onClick={() =>
                    setModalIndex((prev) =>
                      prev === property.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black text-white backdrop-blur-sm h-10 w-10 rounded-full flex items-center justify-center"
                >
                  ›
                </button>
              )}

              {/* COUNTER */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-1 rounded-full">
                {modalIndex + 1} / {property.images.length}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      {openModal && (
        <InterestedModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          propertyId={property._id}
        />
      )}
    </div>
  );
}

/* SUB COMPONENTS (CLEAN & REUSABLE) */

const Info = ({ label, value, icon }: any) => (
  <div className="flex items-start gap-2">
    <div className="text-emerald-600">{icon}</div>
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-semibold text-slate-700 leading-tight">{value}</p>
    </div>
  </div>
);

const Details = ({ label, value }: any) => (
  <div className="flex justify-between py-2 border-b border-slate-100 text-sm">
    <span className="font-medium text-slate-600">{label}</span>
    <span className="text-slate-800">{value}</span>
  </div>
);

const Section = ({ title, children }: any) => (
  <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
    <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
    {children}
  </div>
);

const formatDate = (d: string) => {
  return new Date(d).toLocaleString();
};
