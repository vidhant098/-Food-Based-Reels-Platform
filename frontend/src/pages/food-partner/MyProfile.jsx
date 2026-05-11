import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import './MyProfile.css';

const formatPrice = (price) => {
  const amount = typeof price === 'string' ? Number(price) : price;
  return Number.isFinite(amount) && amount > 0 ? `Rs ${amount}` : 'Menu ready';
};

const getPhone = (partner) => partner?.phone || partner?.Phone || 'Not added';

const MyProfile = () => {
  const [activeSection, setActiveSection] = useState('overview');
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
    const name = foodPartner?.businessName || foodPartner?.ownerName || '';
    if (!name.trim()) return 'FP';

    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }, [foodPartner]);

  const dashboard = useMemo(() => {
    const totalFoods = food.length;
    const totalLikes = food.reduce((sum, item) => sum + (item.likeCount || 0), 0);
    const totalComments = food.reduce((sum, item) => sum + (item.commentCount || 0), 0);
    const pricedFoods = food.filter((item) => Number(item.price) > 0);
    const averagePrice = pricedFoods.length
      ? Math.round(
          pricedFoods.reduce((sum, item) => sum + Number(item.price), 0) /
            pricedFoods.length
        )
      : 0;
    const profileScore =
      45 +
      Math.min(totalFoods * 8, 30) +
      (foodPartner?.address ? 10 : 0) +
      (getPhone(foodPartner) !== 'Not added' ? 10 : 0) +
      (foodPartner?.email ? 5 : 0);

    return {
      averagePrice,
      profileScore: Math.min(profileScore, 100),
      totalComments,
      totalFoods,
      totalLikes,
      totalReach: totalFoods * 137 + totalLikes * 5 + totalComments * 9,
    };
  }, [food, foodPartner]);

  const featuredFood = useMemo(() => {
    if (!food.length) return null;
    return [...food].sort(
      (a, b) =>
        (b.likeCount || 0) +
        (b.commentCount || 0) -
        ((a.likeCount || 0) + (a.commentCount || 0))
    )[0];
  }, [food]);

  if (loading) {
    return (
      <main className="partner-dashboard partner-dashboard--center">
        <div className="dashboard-loader" />
        <p>Preparing your dashboard...</p>
      </main>
    );
  }

  if (!foodPartner) {
    return (
      <main className="partner-dashboard partner-dashboard--center">
        <div className="empty-orb">FP</div>
        <h1>No Profile Found</h1>
        <p>Please login again to open your food partner dashboard.</p>
        <Link to="/food-partner/login" className="primary-action">
          Partner login
        </Link>
      </main>
    );
  }

  return (
    <main className="partner-dashboard">
      <section className="dashboard-hero">
        <div className="dashboard-topbar">
          <div className="partner-avatar" aria-hidden="true">
            {initials}
          </div>

          <div className="partner-heading">
            <span className="eyebrow">Partner dashboard</span>
            <h1>{foodPartner.businessName || 'Food Partner'}</h1>
            <p>{foodPartner.address || 'Add your address so customers can find you faster.'}</p>
            <div className="billboard-details" aria-label="Partner details">
              <span>{foodPartner.ownerName || 'Owner not added'}</span>
              <span>{getPhone(foodPartner)}</span>
              <span>{foodPartner.email || 'Email not added'}</span>
            </div>
          </div>
        </div>

        <div className="hero-actions">
          <Link to="/create-food" className="primary-action">
            Add food
          </Link>
          <button
            type="button"
            className="soft-action"
            onClick={() => setActiveSection('foods')}
          >
            View menu
          </button>
        </div>

        <div className="dashboard-stats" aria-label="Partner performance">
          <article className="stat-tile stat-tile--sunset">
            <span>Foods</span>
            <strong>{dashboard.totalFoods}</strong>
            <small>live posts</small>
          </article>

          <article className="stat-tile stat-tile--mint">
            <span>Reach</span>
            <strong>{dashboard.totalReach.toLocaleString()}</strong>
            <small>estimated views</small>
          </article>

          <article className="stat-tile stat-tile--berry">
            <span>Buzz</span>
            <strong>{dashboard.totalLikes + dashboard.totalComments}</strong>
            <small>likes + comments</small>
          </article>
        </div>
      </section>

      <section className="dashboard-shell">
        <nav className="dashboard-tabs" aria-label="Dashboard sections">
          {['overview', 'foods', 'profile'].map((section) => (
            <button
              key={section}
              type="button"
              className={activeSection === section ? 'active' : ''}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </nav>

        {activeSection === 'overview' && (
          <div className="dashboard-grid">
            <article className="panel profile-score-panel">
              <div>
                <span className="panel-label">Profile strength</span>
                <h2>{dashboard.profileScore}% ready</h2>
                <p>
                  Keep foods, address, phone, and email updated so your shop
                  looks active after every login.
                </p>
              </div>
              <div className="score-ring" style={{ '--score': `${dashboard.profileScore}%` }}>
                <span>{dashboard.profileScore}</span>
              </div>
            </article>

            <article className="panel spotlight-panel">
              <span className="panel-label">Today's spotlight</span>
              {featuredFood ? (
                <div className="spotlight-food">
                  <div className="spotlight-media">
                    {featuredFood.video ? (
                      <video src={featuredFood.video} muted loop autoPlay playsInline />
                    ) : featuredFood.imageUrl ? (
                      <img src={featuredFood.imageUrl} alt={featuredFood.name || 'Food'} />
                    ) : (
                      <span>{featuredFood.name?.slice(0, 1) || 'F'}</span>
                    )}
                  </div>
                  <div>
                    <h2>{featuredFood.name || 'Featured food'}</h2>
                    <p>{featuredFood.description || 'Fresh item from your menu.'}</p>
                    <strong>{formatPrice(featuredFood.price)}</strong>
                  </div>
                </div>
              ) : (
                <div className="mini-empty">
                  <h2>No food posted yet</h2>
                  <p>Add your first reel to unlock menu insights.</p>
                </div>
              )}
            </article>

            <article className="panel quick-panel">
              <span className="panel-label">Quick actions</span>
              <div className="quick-actions">
                <Link to="/create-food">Create a reel</Link>
                <button type="button" onClick={() => setActiveSection('profile')}>
                  Check details
                </button>
                <button type="button" onClick={() => setActiveSection('foods')}>
                  Manage foods
                </button>
              </div>
            </article>

            <article className="panel tips-panel">
              <span className="panel-label">Next best moves</span>
              <ul>
                <li>Add prices to every food item.</li>
                <li>Use short videos with bright lighting.</li>
                <li>Keep the dish name clear and searchable.</li>
              </ul>
            </article>
          </div>
        )}

        {activeSection === 'foods' && (
          <section className="foods-section">
            <div className="section-heading">
              <div>
                <span className="panel-label">Your menu reels</span>
                <h2>{food.length ? `${food.length} food posts` : 'Start your menu'}</h2>
              </div>
              <Link to="/create-food" className="compact-action">
                New
              </Link>
            </div>

            {food.length > 0 ? (
              <div className="food-card-grid">
                {food.map((item, index) => (
                  <article
                    key={item._id}
                    className="food-card"
                    style={{ '--card-delay': `${Math.min(index, 9) * 45}ms` }}
                  >
                    <div className="food-media">
                      {item.video ? (
                        <video
                          src={item.video}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      ) : item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name || 'Food'} />
                      ) : (
                        <div className="food-fallback">{item.name?.slice(0, 1) || 'F'}</div>
                      )}
                    </div>
                    <div className="food-card-body">
                      <div>
                        <h3>{item.name || 'Untitled food'}</h3>
                        <p>{item.description || 'No description added yet.'}</p>
                      </div>
                      <div className="food-card-footer">
                        <span>{formatPrice(item.price)}</span>
                        <small>
                          {(item.likeCount || 0) + (item.commentCount || 0)} reactions
                        </small>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-panel">
                <div className="empty-orb">+</div>
                <h2>Your dashboard is waiting for its first dish</h2>
                <p>Add a food video and it will appear here as a colorful menu card.</p>
                <Link to="/create-food" className="primary-action">
                  Add first food
                </Link>
              </div>
            )}
          </section>
        )}

        {activeSection === 'profile' && (
          <section className="profile-details">
            <article className="panel detail-panel">
              <span className="panel-label">Business info</span>
              <dl>
                <div>
                  <dt>Owner</dt>
                  <dd>{foodPartner.ownerName || 'Not added'}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{foodPartner.email || 'Not added'}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{getPhone(foodPartner)}</dd>
                </div>
                <div>
                  <dt>Address</dt>
                  <dd>{foodPartner.address || 'Not added'}</dd>
                </div>
              </dl>
            </article>

            <article className="panel detail-panel">
              <span className="panel-label">Menu health</span>
              <dl>
                <div>
                  <dt>Total foods</dt>
                  <dd>{dashboard.totalFoods}</dd>
                </div>
                <div>
                  <dt>Average price</dt>
                  <dd>{dashboard.averagePrice ? `Rs ${dashboard.averagePrice}` : 'Add prices'}</dd>
                </div>
                <div>
                  <dt>Total likes</dt>
                  <dd>{dashboard.totalLikes}</dd>
                </div>
                <div>
                  <dt>Total comments</dt>
                  <dd>{dashboard.totalComments}</dd>
                </div>
              </dl>
            </article>
          </section>
        )}
      </section>

      <BottomNav />
    </main>
  );
};

export default MyProfile;
