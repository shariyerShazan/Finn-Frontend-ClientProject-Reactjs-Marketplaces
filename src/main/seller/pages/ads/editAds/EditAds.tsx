/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Loader2, Upload, X, MapPin, Crosshair } from "lucide-react";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
} from "@/redux/fetures/admin/admin-category.api";
import { useUpdateAdMutation } from "@/redux/fetures/ads.api";
import { useGetSingleMyAdQuery } from "@/redux/fetures/users.api";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const SellerEditAds = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // States
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);
  const [selectedCatId, setSelectedCatId] = useState<string>("");
  const [selectedSubCat, setSelectedSubCat] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    23.8103, 90.4125,
  ]);

  const { control, register, handleSubmit, setValue, watch, reset } =
    useForm<any>();

  // API Hooks
  const { data: adDetails, isLoading: isAdLoading } = useGetSingleMyAdQuery(id);
  const { data: categoriesData } = useGetAllCategoriesQuery({
    page: 1,
    limit: 1000,
  });
     const categories = categoriesData?.data || [];

  const { data: categoryDetails } = useGetSingleCategoryQuery(selectedCatId, {
    skip: !selectedCatId,
  });
  const subCategories = categoryDetails?.subCategories || [];

  const [updateAd, { isLoading: isUpdating }] = useUpdateAdMutation();

  const currentLat = watch("latitude") || 23.8103;
  const currentLng = watch("longitude") || 90.4125;

  // Effect 1: Load Ad Data into Form
  useEffect(() => {
    if (adDetails?.data) {
      const ad = adDetails.data;
      reset({
        ...ad,
        latitude: Number(ad.latitude),
        longitude: Number(ad.longitude),
      });

      setSelectedCatId(ad.categoryId);
      setExistingImages(ad.images || []);
      setMapCenter([Number(ad.latitude), Number(ad.longitude)]);
    }
  }, [adDetails, reset]);

  // Effect 2: Sync Subcategory and Specs when Category Details are loaded
  useEffect(() => {
    if (categoryDetails?.subCategories && adDetails?.data) {
      const sub = categoryDetails.subCategories.find(
        (s: any) => s.id === adDetails.data.subCategoryId,
      );

      if (sub) {
        setSelectedSubCat(sub);
        if (adDetails.data.specifications) {
          Object.entries(adDetails.data.specifications).forEach(
            ([key, value]) => {
              setValue(`spec_${key}`, value);
            },
          );
        }
      }
    }
  }, [categoryDetails, adDetails?.data, setValue]);

  const handleCategoryChange = (
    catId: string,
    onChange: (val: string) => void,
  ) => {
    setSelectedCatId(catId);
    onChange(catId);
    setValue("subCategoryId", "");
    setSelectedSubCat(null);
  };

  const handleSubCategoryChange = (
    subId: string,
    onChange: (val: string) => void,
  ) => {
    const sub = subCategories.find((s: any) => s.id === subId);
    setSelectedSubCat(sub || null);
    onChange(subId);
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    // Base Fields
    const baseFields = [
      "title",
      "description",
      "price",
      "propertyFor",
      "country",
      "state",
      "city",
      "zipCode",
      "categoryId",
      "subCategoryId",
      "showAddress",
      "allowPhone",
      "allowEmail",
      "latitude",
      "longitude",
    ];

    baseFields.forEach((field) => {
      if (data[field] !== undefined) formData.append(field, data[field]);
    });

    // Specifications
    const specs: Record<string, any> = {};
    selectedSubCat?.specFields?.forEach((f: any) => {
      const val = data[`spec_${f.key}`];
      if (val !== undefined && val !== "") {
        specs[f.key] = f.type === "number" ? Number(val) : val;
      }
    });
    formData.append("specifications", JSON.stringify(specs));

    // Images
    newImages.forEach((file) => formData.append("images", file));
    if (deletedImageIds.length > 0) {
      formData.append("imagesToDelete", deletedImageIds.join(","));
    }

    try {
      await updateAd({ adId: id, data: formData }).unwrap();
      toast.success("Ad updated successfully!");
      navigate("/seller/dashboard/all-ads");
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setValue("latitude", e.latlng.lat);
        setValue("longitude", e.latlng.lng);
      },
    });
    return null;
  }

  const getDeviceLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setValue("latitude", pos.coords.latitude);
      setValue("longitude", pos.coords.longitude);
      setMapCenter([pos.coords.latitude, pos.coords.longitude]);
      toast.success("Location Sync!");
    });
  };

  if (isAdLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="p-4 mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Edit Listing</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Essential Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Ad Title *</Label>
                  <Input {...register("title", { required: true })} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Controller
                      control={control}
                      name="categoryId"
                      render={({ field }) => (
                        <Select
                          key={
                            field.value ? `cat-${field.value}` : "cat-loading"
                          }
                          onValueChange={(val) =>
                            handleCategoryChange(val, field.onChange)
                          }
                          value={field.value || ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((c: any) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Sub Category</Label>
                    <Controller
                      control={control}
                      name="subCategoryId"
                      render={({ field }) => (
                        <Select
                          key={
                            field.value ? `sub-${field.value}` : "sub-loading"
                          }
                          onValueChange={(val) =>
                            handleSubCategoryChange(val, field.onChange)
                          }
                          value={field.value || ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Sub Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {subCategories.map((s: any) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price ($) *</Label>
                    <Input
                      type="number"
                      {...register("price", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Property For</Label>
                    <Controller
                      control={control}
                      name="propertyFor"
                      render={({ field }) => (
                        <Select
                          key={
                            field.value ? `for-${field.value}` : "for-loading"
                          }
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SALE">For Sale</SelectItem>
                            <SelectItem value="RENT">For Rent</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            {selectedSubCat?.specFields?.length > 0 && (
              <Card className="bg-slate-50 border-dashed">
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {selectedSubCat.specFields.map((field: any) => (
                    <div key={field.key} className="space-y-2">
                      <Label>{field.label}</Label>
                      {field.type === "select" ? (
                        <Controller
                          control={control}
                          name={`spec_${field.key}`}
                          render={({ field: specField }) => (
                            <Select
                              onValueChange={specField.onChange}
                              value={specField.value || ""}
                            >
                              <SelectTrigger className="bg-white w-full">
                                <SelectValue placeholder="Choose" />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map((o: string) => (
                                  <SelectItem key={o} value={o}>
                                    {o}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      ) : (
                        <Input
                          className="bg-white"
                          type={field.type === "number" ? "number" : "text"}
                          {...register(`spec_${field.key}`)}
                        />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea {...register("description")} rows={6} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[400px] space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex gap-2">
                  <MapPin size={18} /> Location
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={getDeviceLocation}
                >
                  <Crosshair size={14} className="mr-1" /> Sync
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-[200px] w-full rounded-md overflow-hidden border">
                  <MapContainer
                    center={mapCenter}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker
                      position={[currentLat, currentLng]}
                      icon={customIcon}
                      draggable
                      eventHandlers={{
                        dragend: (e) => {
                          const pos = e.target.getLatLng();
                          setValue("latitude", pos.lat);
                          setValue("longitude", pos.lng);
                        },
                      }}
                    />
                    <MapClickHandler />
                  </MapContainer>
                </div>
                <Input {...register("country")} placeholder="Country" />
                <Input {...register("state")} placeholder="State" />
                <div className="grid grid-cols-2 gap-2">
                  <Input {...register("city")} placeholder="City" />
                  <Input {...register("zipCode")} placeholder="Zip Code" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["showAddress", "allowPhone", "allowEmail"].map((name) => (
                  <div key={name} className="flex items-center justify-between">
                    <Label className="capitalize">
                      {name.replace(/([A-Z])/g, " $1")}
                    </Label>
                    <Controller
                      control={control}
                      name={name}
                      render={({ field }) => (
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {existingImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative aspect-square border rounded-lg overflow-hidden group"
                    >
                      <img
                        src={img.url}
                        className="w-full h-full object-cover"
                        alt="Existing"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setDeletedImageIds((prev) => [...prev, img.id]);
                          setExistingImages((prev) =>
                            prev.filter((item) => item.id !== img.id),
                          );
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {newImages.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square border rounded-lg overflow-hidden ring-2 ring-blue-400"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        className="w-full h-full object-cover"
                        alt="New"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setNewImages((prev) =>
                            prev.filter((_, idx) => idx !== i),
                          )
                        }
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-slate-50">
                    <Upload size={20} className="text-slate-400" />
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) =>
                        e.target.files &&
                        setNewImages((prev) => [
                          ...prev,
                          ...Array.from(e.target.files!),
                        ])
                      }
                    />
                  </label>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-blue-600 h-12 text-lg"
            >
              {isUpdating ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SellerEditAds;
