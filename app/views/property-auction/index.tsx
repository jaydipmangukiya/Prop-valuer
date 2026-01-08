/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Header from "@/components/Header";
import PropertyCard from "./List/PropertyCard";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
  AuctionProperty,
  getAuctionProperties,
} from "@/app/api/auctionProperty";
import { useToast } from "@/hooks/use-toast";
import { Check, Loader2 } from "lucide-react";
import { getCitiesByState, getStates } from "@/lib/locationService";
import { propertyTypeOptions } from "@/lib/constant";
import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const PropertyauctionList = () => {
  const [items, setItems] = useState<AuctionProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [totalProperties, setTotalProperties] = useState(0);
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    location: "",
    type: "",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  useEffect(() => {
    loadProperties();
  }, [appliedFilters]);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const response = await getAuctionProperties({
        limit: 20,
        skip: 0,
        ...appliedFilters,
      });
      setItems(response?.data || []);
      setTotalProperties(response?.pagination?.totalCount || 0);
    } catch (err: any) {
      toast({
        title: "Failed to load properties ❌",
        description: err?.message,
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="bg-white border rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-700">
              Filter Properties
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600">
                State
              </label>
              <Select.Root
                value={filters.state}
                onValueChange={(value) =>
                  setFilters({ ...filters, state: value, city: "" })
                }
              >
                <Select.Trigger className="mt-1 w-full h-[42px] flex items-center justify-between rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 data-[placeholder]:text-slate-400">
                  <Select.Value placeholder="All States" />
                  <Select.Icon>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    position="popper"
                    sideOffset={6}
                    className="z-50 w-[var(--radix-select-trigger-width)] rounded-lg border border-slate-200 bg-white shadow-xl animate-in fade-in zoom-in-95"
                  >
                    <Select.Viewport className="max-h-64 overflow-y-auto p-1">
                      {getStates().map((s) => (
                        <Select.Item
                          key={s.isoCode}
                          value={s.name}
                          className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-slate-700 outline-none hover:bg-emerald-50 data-[state=checked]:bg-emerald-100"
                        >
                          <Select.ItemText>{s.name}</Select.ItemText>
                          <Select.ItemIndicator className="absolute right-3">
                            <Check className="h-4 w-4 text-emerald-600" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            {/* City */}
            <div>
              <label className="text-sm font-medium text-slate-600">City</label>
              <Select.Root
                value={filters.city}
                onValueChange={(value) =>
                  setFilters({ ...filters, city: value })
                }
                disabled={!filters.state}
              >
                <Select.Trigger
                  className={`mt-1 w-full h-[42px] flex items-center justify-between rounded-lg border border-slate-300 bg-white px-3 text-sm
      ${!filters.state ? "bg-slate-100 text-slate-400" : "text-slate-800"}
      focus:outline-none focus:ring-2 focus:ring-emerald-500 data-[placeholder]:text-slate-400`}
                >
                  <Select.Value placeholder="All Cities" />
                  <Select.Icon>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content
                    position="popper"
                    sideOffset={6}
                    className="z-50 w-[var(--radix-select-trigger-width)] rounded-lg border border-slate-200 bg-white shadow-xl animate-in fade-in zoom-in-95"
                  >
                    <Select.Viewport className="max-h-64 overflow-y-auto p-1">
                      {filters.state &&
                        getCitiesByState(
                          getStates().find((s) => s.name === filters.state)
                            ?.isoCode || ""
                        ).map((c) => (
                          <Select.Item
                            key={c.name}
                            value={c.name}
                            className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-slate-700 outline-none hover:bg-emerald-50 data-[state=checked]:bg-emerald-100"
                          >
                            <Select.ItemText>{c.name}</Select.ItemText>
                            <Select.ItemIndicator className="absolute right-3">
                              <Check className="h-4 w-4 text-emerald-600" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">
                Location / Area
              </label>
              <input
                type="text"
                placeholder="e.g. Mota Varachha"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
                className="mt-1 w-full h-[42px] rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">
                Property Type
              </label>
              <Select.Root
                value={filters.type}
                onValueChange={(value) =>
                  setFilters({ ...filters, type: value })
                }
              >
                <Select.Trigger className="mt-1 w-full h-[42px] flex items-center justify-between rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 data-[placeholder]:text-slate-400">
                  <Select.Value placeholder="All Types" />
                  <Select.Icon>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    position="popper"
                    sideOffset={6}
                    className="z-50 w-[var(--radix-select-trigger-width)] rounded-lg border border-slate-200 bg-white shadow-xl"
                  >
                    <Select.Viewport className="max-h-60 p-1">
                      {propertyTypeOptions.map((opt) => (
                        <Select.Item
                          key={opt.value}
                          value={opt.value}
                          className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-slate-700 outline-none hover:bg-emerald-50 data-[state=checked]:bg-emerald-100"
                        >
                          <Select.ItemText>{opt.label}</Select.ItemText>
                          <Select.ItemIndicator className="absolute right-3">
                            <Check className="h-4 w-4 text-emerald-600" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3">
            <Button
              onClick={() => {
                const reset = {
                  state: "",
                  city: "",
                  location: "",
                  type: "",
                };
                setFilters(reset);
                setAppliedFilters(reset);
              }}
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              Clear Filters
            </Button>
            <Button
              onClick={() => setAppliedFilters(filters)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
          Properties for Sale
        </h1>

        {loading && (
          <div className="flex justify-center items-center h-[400px]">
            <Loader2 className="h-6 w-6 text-emerald-600 animate-spin mr-2" />
          </div>
        )}
        {!loading && (
          <>
            {items.length > 0 ? (
              <>
                <p className="text-slate-600 mb-8">
                  Showing <strong>{totalProperties}</strong> results
                </p>

                <div className="space-y-8">
                  {items.map((item: any) => (
                    <PropertyCard key={item._id} data={item} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-slate-500 py-20 text-lg">
                No properties available.
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default PropertyauctionList;
