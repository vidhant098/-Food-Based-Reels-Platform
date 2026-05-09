import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import './MyProfile.css';

const formatPrice = (p) => {
  const n = typeof p === 'string' ? Number(p) : p;
  if (Number.isFinite(n) && n > 0) return `₹${n}`;
  return '';
};


const MyProfile = () => {
  const [activeSection, setActiveSection] = useState('myFoods');
  const [foodPartner, setFoodPartner] = useState(null);
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodPartnerProfile = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/food-partner/profile',
          { withCredentials: true }
        );

        setFoodPartner(response.data.foodPartner);
        setFood(response.data.foods || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodPartnerProfile();
  }, []);

  const initials = useMemo(() => {
    const name = foodPartner?.businessName || '';
    if (!name.trim()) return 'F';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 1).toUpperCase();
  }, [foodPartner]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!foodPartner) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center">
        No Profile Found
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#070a12] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,209,102,0.20),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(252,211,77,0.15),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(45,212,191,0.12),transparent_45%)]" />

        <div className="relative mx-auto max-w-[980px] px-4 pt-6 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-400 via-amber-300 to-emerald-300 p-[2px] shadow-zomato">
                <div className="h-full w-full rounded-[14px] bg-[#0b0f1a] flex items-center justify-center">
                  <span className="text-lg font-extrabold">{initials}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold tracking-tight">
                    {foodPartner.businessName}
                  </h1>
                  <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-amber-200 border border-amber-200/30">
                    Partner
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/70">
                  @{foodPartner.ownerName} • {foodPartner.address}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <button
                className={
                  activeSection === 'profile'
                    ? 'rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold border border-white/20'
                    : 'rounded-xl bg-white/5 px-3 py-2 text-sm font-semibold border border-white/10 hover:bg-white/10 transition'
                }
                onClick={() => setActiveSection('profile')}
              >
                Profile
              </button>

              <button
                className={
                  activeSection === 'myFoods'
                    ? 'rounded-xl bg-gradient-to-r from-amber-300 to-orange-400 px-3 py-2 text-sm font-extrabold text-black hover:opacity-90 transition'
                    : 'rounded-xl bg-white/5 px-3 py-2 text-sm font-extrabold text-amber-200 border border-white/10 hover:bg-white/10 transition'
                }
                onClick={() => setActiveSection('myFoods')}
              >
                My Foods
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-extrabold">{food.length}</div>
              <div className="mt-1 text-xs text-white/60">Videos</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-extrabold">{food.length * 17}</div>
              <div className="mt-1 text-xs text-white/60">Views</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-extrabold">{food.length * 3 + 24}</div>
              <div className="mt-1 text-xs text-white/60">Orders</div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-white/70">
              Owner:{' '}
              <span className="font-semibold text-white">{foodPartner.ownerName}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/create-food"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-300 to-orange-400 px-4 py-2 text-sm font-extrabold text-black hover:opacity-90 transition"
              >
                + Add Food
              </Link>
              <button
                onClick={() => setActiveSection('myFoods')}
                className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-extrabold text-amber-200 hover:bg-white/10 transition"
              >
                Reels
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="mx-auto max-w-[980px] px-4 pb-24">
        {activeSection === 'profile' ? (
          <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <h2 className="text-lg font-extrabold">Partner details</h2>
                <p className="mt-2 text-sm text-white/70">
                  Phone: <span className="font-semibold text-white">{foodPartner.Phone}</span>
                </p>
                <p className="mt-1 text-sm text-white/70">
                  Email: <span className="font-semibold text-white">{foodPartner.email}</span>
                </p>
                <p className="mt-1 text-sm text-white/70">
                  Address:{' '}
                  <span className="font-semibold text-white">{foodPartner.address}</span>
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <h2 className="text-lg font-extrabold">Quick tips</h2>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <div className="text-xs text-white/60">Tip</div>
                    <div className="mt-1 text-sm font-semibold">Short reels</div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <div className="text-xs text-white/60">Tip</div>
                    <div className="mt-1 text-sm font-semibold">Price overlay</div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <div className="text-xs text-white/60">Tip</div>
                    <div className="mt-1 text-sm font-semibold">Clear menu</div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <div className="text-xs text-white/60">Tip</div>
                    <div className="mt-1 text-sm font-semibold">Auto-play</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="mt-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-extrabold">My Foods</h2>
              <div className="text-sm text-white/60">Showing {Math.min(food.length, 9)} videos</div>
            </div>

            {food.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {food.slice(0, 9).map((item) => (
                  <div
                    key={item._id}
                    className="reel-card group relative aspect-square overflow-hidden rounded-2xl bg-black/20 border border-transparent"
                    
                  >
                    {item.video ? (
                      <video
                        src={item.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover opacity-95 group-hover:scale-[1.02] transition-transform"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-black/20">
                        <span className="text-sm font-semibold text-white/60">No video</span>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold text-amber-200 truncate">
                            {item.name || 'Food'}
                          </div>
                          <div className="text-[11px] text-white/70 line-clamp-1">
                            {item.description || 'Fresh & tasty'}
                          </div>
                        </div>
                        {item.price ? (
                          <div className="shrink-0 rounded-full bg-amber-400/90 px-2 py-1 text-[11px] font-extrabold text-black">
                            ₹{item.price}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
                <div className="text-4xl">🍽️</div>
                <div className="mt-3 text-lg font-extrabold">No videos yet</div>
                <div className="mt-1 text-sm text-white/70">
                  Add your first food video to look amazing on FoodPartner.
                </div>
                <div className="mt-4">
                  <Link
                    to="/create-food"
                    className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-2 text-sm font-extrabold text-black hover:opacity-90 transition"
                  >
                    Create food
                  </Link>
                </div>
              </div>
            )}
          </section>
        )}

        <BottomNav />
      </div>
    </div>
  );
};

export default MyProfile;

