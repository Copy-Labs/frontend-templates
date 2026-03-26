"use client";

import { useState, useRef, useEffect } from "react";

// Mock Product Data
const PRODUCT = {
  id: "lx-900",
  name: "LUXE Artisan",
  tagline: "Handcrafted Audio Perfection",
  description:
    "Every note, precisely as intended. The LUXE Artisan headphones represent the pinnacle of acoustic engineering, meticulously crafted by master artisans using century-old techniques and modern innovation.",
  basePrice: 2499,
  priceHistory: [
    { date: "2024-01", price: 2299 },
    { date: "2024-06", price: 2399 },
    { date: "2024-12", price: 2499 },
  ],
  features: [
    {
      icon: "🎵",
      title: "40mm Beryllium Drivers",
      description: "Ultra-light, rigid drivers deliver unparalleled clarity",
    },
    {
      icon: "🔊",
      title: "Active Noise Cancellation",
      description: "Adaptive ANC adjusts to your environment in real-time",
    },
    {
      icon: "⏱️",
      title: "60-Hour Battery",
      description: "Extended playback with rapid charge support",
    },
    {
      icon: "🎨",
      title: "Hand-Finished Design",
      description: "Premium materials including Italian leather and brushed brass",
    },
  ],
  specifications: [
    { label: "Frequency Response", value: "4Hz - 40kHz" },
    { label: "Impedance", value: "32Ω" },
    { label: "Sensitivity", value: "105dB SPL/mW" },
    { label: "Weight", value: "285g" },
    { label: "Bluetooth", value: "5.3" },
    { label: "Codec Support", value: "LDAC, aptX HD, AAC" },
  ],
  variants: [
    {
      id: "obsidian",
      name: "Obsidian Black",
      color: "#1a1a1a",
      accent: "#2d2d2d",
      priceModifier: 0,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    },
    {
      id: "champagne",
      name: "Champagne Gold",
      color: "#c9a962",
      accent: "#f5e6c8",
      priceModifier: 200,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    },
    {
      id: "arctic",
      name: "Arctic Silver",
      color: "#c0c0c0",
      accent: "#e8e8e8",
      priceModifier: 100,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
    },
  ],
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&q=80",
    "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=1200&q=80",
  ],
};

// Components
function ProductImageGallery({
  images,
  selectedImage,
  onSelectImage,
}: {
  images: string[];
  selectedImage: number;
  onSelectImage: (index: number) => void;
}) {
  return (
    <div className="gallery">
      <div className="thumbnail-list">
        {images.map((img, index) => (
          <button
            key={index}
            className={`thumbnail ${selectedImage === index ? "active" : ""}`}
            onClick={() => onSelectImage(index)}
            style={{
              backgroundImage: `url(${img})`,
            }}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ZoomableImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [zoom, setZoom] = useState({ x: 0, y: 0, scale: 1 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ x, y, scale: 2 });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setZoom((prev) => ({ ...prev, scale: 2 }));
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setZoom({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div
      ref={containerRef}
      className="product-image-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="product-image"
        style={{
          backgroundImage: `url(${src})`,
          transform: isHovering ? `scale(${zoom.scale})` : "scale(1)",
          transformOrigin: isHovering ? `${zoom.x}% ${zoom.y}%` : "center center",
        }}
      >
        {!isHovering && (
          <div className="zoom-hint">
            <span>Hover to zoom</span>
          </div>
        )}
      </div>
    </div>
  );
}

function VariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: {
  variants: typeof PRODUCT.variants;
  selectedVariant: string;
  onSelectVariant: (id: string) => void;
}) {
  return (
    <div className="variant-selector">
      <span className="variant-label">Finish</span>
      <div className="variant-options">
        {variants.map((variant) => (
          <button
            key={variant.id}
            className={`variant-option ${selectedVariant === variant.id ? "active" : ""}`}
            onClick={() => onSelectVariant(variant.id)}
            aria-label={variant.name}
          >
            <span
              className="variant-swatch"
              style={{ backgroundColor: variant.color }}
            />
            <span className="variant-name">{variant.name}</span>
            {variant.priceModifier > 0 && (
              <span className="variant-price">+${variant.priceModifier}</span>
            )}
            {variant.priceModifier === 0 && (
              <span className="variant-price-included">Included</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function QuantitySelector({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (qty: number) => void;
}) {
  return (
    <div className="quantity-selector">
      <span className="quantity-label">Quantity</span>
      <div className="quantity-controls">
        <button
          className="quantity-btn"
          onClick={() => onChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="quantity-value">{quantity}</span>
        <button
          className="quantity-btn"
          onClick={() => onChange(quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}

function PriceDisplay({
  basePrice,
  modifier,
  quantity,
}: {
  basePrice: number;
  modifier: number;
  quantity: number;
}) {
  const total = (basePrice + modifier) * quantity;
  const perUnit = basePrice + modifier;

  return (
    <div className="price-display">
      <div className="price-main">
        <span className="price-currency">$</span>
        <span className="price-value">{perUnit.toLocaleString()}</span>
      </div>
      {modifier > 0 && (
        <div className="price-breakdown">
          <span className="base-price">${basePrice.toLocaleString()} base</span>
          <span className="modifier">+ ${modifier.toLocaleString()} {modifier === 200 ? "Champagne Gold" : "finish"}</span>
        </div>
      )}
      {quantity > 1 && (
        <div className="price-total">
          <span className="total-label">Total ({quantity} items)</span>
          <span className="total-value">${total.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}

function StickyCheckout({
  price,
  onAddToCart,
}: {
  price: number;
  onAddToCart: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky-checkout ${isVisible ? "visible" : ""}`}>
      <div className="sticky-checkout-content">
        <div className="sticky-price">
          <span className="sticky-currency">$</span>
          <span className="sticky-price-value">{price.toLocaleString()}</span>
        </div>
        <button className="sticky-add-to-cart" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <div
      className="feature-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="feature-icon">{icon}</span>
      <h4 className="feature-title">{title}</h4>
      <p className="feature-description">{description}</p>
    </div>
  );
}

function SpecificationRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="spec-row">
      <span className="spec-label">{label}</span>
      <span className="spec-value">{value}</span>
    </div>
  );
}

// Main Component
export default function EcommercePage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(PRODUCT.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const currentVariant = PRODUCT.variants.find((v) => v.id === selectedVariant)!;
  const currentPrice = PRODUCT.basePrice + currentVariant.priceModifier;
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleRotate = () => {
    setIsRotating(true);
    setTimeout(() => {
      setSelectedImage((prev) => (prev + 1) % PRODUCT.images.length);
      setIsRotating(false);
    }, 500);
  };

  return (
    <main className="product-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">LUXE</div>
        <div className="nav-links">
          <a href="#">Products</a>
          <a href="#">About</a>
          <a href="#">Support</a>
        </div>
        <div className="nav-cart">
          <span className="cart-icon">🛒</span>
          <span className="cart-count">0</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tagline">{PRODUCT.tagline}</span>
          <h1 className="hero-title">{PRODUCT.name}</h1>
          <p className="hero-description">{PRODUCT.description}</p>
        </div>
      </section>

      {/* Product Section */}
      <section className="product-section">
        <div className="product-grid">
          {/* Image Gallery */}
          <div className="product-visuals">
            <ZoomableImage
              src={PRODUCT.images[selectedImage]}
              alt={`${PRODUCT.name} - ${currentVariant.name}`}
            />
            <ProductImageGallery
              images={PRODUCT.images}
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
            />
            <button
              className="rotate-btn"
              onClick={handleRotate}
              disabled={isRotating}
              aria-label="Rotate product"
            >
              <span className={isRotating ? "spinning" : ""}>⟳</span>
              <span>360° View</span>
            </button>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <div className="product-header">
              <span className="product-id">{PRODUCT.id.toUpperCase()}</span>
              <h2 className="product-name">{PRODUCT.name}</h2>
            </div>

            <PriceDisplay
              basePrice={PRODUCT.basePrice}
              modifier={currentVariant.priceModifier}
              quantity={quantity}
            />

            <VariantSelector
              variants={PRODUCT.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />

            <QuantitySelector quantity={quantity} onChange={setQuantity} />

            <div className="action-buttons">
              <button
                className={`add-to-cart-btn ${isAdded ? "added" : ""}`}
                onClick={handleAddToCart}
              >
                {isAdded ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button className="wishlist-btn" aria-label="Add to wishlist">
                ♡
              </button>
            </div>

            {/* Features */}
            <div className="features-grid">
              {PRODUCT.features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 100}
                />
              ))}
            </div>

            {/* Specifications */}
            <div className="specifications">
              <h3 className="specs-title">Specifications</h3>
              <div className="specs-list">
                {PRODUCT.specifications.map((spec, index) => (
                  <SpecificationRow
                    key={index}
                    label={spec.label}
                    value={spec.value}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Checkout */}
      <StickyCheckout price={totalPrice} onAddToCart={handleAddToCart} />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">LUXE</div>
          <p className="footer-tagline">Crafted for Excellence</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .product-page {
          min-height: 100vh;
          padding-bottom: 100px;
        }

        /* Navigation */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 3rem;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: linear-gradient(to bottom, rgba(10, 10, 10, 0.95), transparent);
          backdrop-filter: blur(10px);
        }

        .nav-brand {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          color: var(--color-gold);
        }

        .nav-links {
          display: flex;
          gap: 3rem;
        }

        .nav-links a {
          color: var(--color-platinum);
          text-decoration: none;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color var(--duration-fast) var(--transition-smooth);
        }

        .nav-links a:hover {
          color: var(--color-gold);
        }

        .nav-cart {
          position: relative;
          cursor: pointer;
        }

        .cart-icon {
          font-size: 1.5rem;
        }

        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--color-gold);
          color: var(--color-obsidian);
          font-size: 0.7rem;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        /* Hero */
        .hero {
          padding: 12rem 3rem 4rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(201, 169, 98, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          animation: fadeInUp 1s var(--transition-smooth) forwards;
        }

        .hero-tagline {
          display: block;
          font-size: 0.9rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 1rem;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: 5rem;
          font-weight: 300;
          letter-spacing: 0.05em;
          color: var(--color-cream);
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .hero-description {
          max-width: 600px;
          margin: 0 auto;
          font-size: 1.1rem;
          color: var(--color-platinum);
          opacity: 0.8;
          line-height: 1.8;
        }

        /* Product Section */
        .product-section {
          padding: 2rem 3rem 6rem;
        }

        .product-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Product Visuals */
        .product-visuals {
          position: sticky;
          top: 120px;
          height: fit-content;
          animation: scaleIn 1s var(--transition-smooth) forwards;
          opacity: 0;
          animation-delay: 0.2s;
        }

        .product-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          border-radius: 16px;
          overflow: hidden;
          background: var(--color-onyx);
          cursor: crosshair;
          box-shadow: var(--shadow-glow);
        }

        .product-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.4s var(--transition-smooth);
        }

        .zoom-hint {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.6);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          color: var(--color-platinum);
          pointer-events: none;
          opacity: 0.8;
          transition: opacity var(--duration-fast);
        }

        .product-image-container:hover .zoom-hint {
          opacity: 0;
        }

        /* Thumbnail Gallery */
        .thumbnail-list {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .thumbnail {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          background-size: cover;
          background-position: center;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all var(--duration-fast) var(--transition-smooth);
          opacity: 0.5;
        }

        .thumbnail:hover {
          opacity: 0.8;
        }

        .thumbnail.active {
          border-color: var(--color-gold);
          opacity: 1;
        }

        .rotate-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--color-graphite);
          border: 1px solid var(--color-smoke);
          border-radius: 8px;
          color: var(--color-platinum);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all var(--duration-fast) var(--transition-smooth);
        }

        .rotate-btn:hover {
          background: var(--color-smoke);
          border-color: var(--color-gold);
        }

        .rotate-btn .spinning {
          display: inline-block;
          animation: spin 0.5s linear;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Product Details */
        .product-details {
          animation: fadeInUp 1s var(--transition-smooth) forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }

        .product-header {
          margin-bottom: 2rem;
        }

        .product-id {
          display: block;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          color: var(--color-gold);
          margin-bottom: 0.5rem;
        }

        .product-name {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 400;
          color: var(--color-cream);
          line-height: 1.2;
        }

        /* Price Display - ENHANCED */
        .price-display {
          padding: 1.5rem 0;
          border-top: 1px solid var(--color-smoke);
          border-bottom: 1px solid var(--color-smoke);
          margin-bottom: 2rem;
          background: linear-gradient(135deg, rgba(201, 169, 98, 0.05) 0%, transparent 50%);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .price-main {
          display: flex;
          align-items: flex-start;
          gap: 0.25rem;
        }

        .price-currency {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 300;
          color: var(--color-gold);
          margin-top: 0.5rem;
        }

        .price-value {
          font-family: var(--font-display);
          font-size: 3.5rem;
          font-weight: 500;
          color: var(--color-gold);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .price-breakdown {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px dashed rgba(201, 169, 98, 0.2);
        }

        .base-price {
          font-size: 0.85rem;
          color: var(--color-platinum);
          opacity: 0.5;
        }

        .modifier {
          font-size: 0.85rem;
          color: var(--color-gold-light);
          background: rgba(201, 169, 98, 0.15);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-weight: 500;
        }

        .price-total {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-graphite);
        }

        .total-label {
          font-size: 0.9rem;
          color: var(--color-platinum);
          opacity: 0.7;
        }

        .total-value {
          font-size: 1.25rem;
          color: var(--color-gold-light);
          font-weight: 600;
        }

        /* Variant Selector - ENHANCED */
        .variant-selector {
          margin-bottom: 2rem;
        }

        .variant-label {
          display: block;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-platinum);
          opacity: 0.6;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .variant-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .variant-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: var(--color-onyx);
          border: 2px solid var(--color-smoke);
          border-radius: 12px;
          cursor: pointer;
          transition: all var(--duration-normal) var(--transition-smooth);
          position: relative;
          overflow: hidden;
        }

        .variant-option::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(201, 169, 98, 0.1) 0%, transparent 100%);
          opacity: 0;
          transition: opacity var(--duration-fast);
        }

        .variant-option:hover {
          border-color: var(--color-gold-dark);
          transform: translateX(4px);
        }

        .variant-option:hover::before {
          opacity: 1;
        }

        .variant-option.active {
          border-color: var(--color-gold);
          background: linear-gradient(135deg, rgba(201, 169, 98, 0.15) 0%, var(--color-onyx) 100%);
          box-shadow: 0 0 30px rgba(201, 169, 98, 0.15);
        }

        .variant-option.active::before {
          opacity: 1;
        }

        .variant-option.active::after {
          content: '✓';
          position: absolute;
          right: 1.25rem;
          color: var(--color-gold);
          font-weight: 600;
        }

        .variant-swatch {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid var(--color-smoke);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: all var(--duration-fast);
        }

        .variant-option:hover .variant-swatch {
          border-color: var(--color-gold-dark);
          transform: scale(1.1);
        }

        .variant-option.active .variant-swatch {
          border-color: var(--color-gold);
          box-shadow: 0 0 15px rgba(201, 169, 98, 0.3);
        }

        .variant-name {
          flex: 1;
          text-align: left;
          color: var(--color-platinum);
          font-size: 1rem;
          font-weight: 500;
        }

        .variant-price {
          color: var(--color-gold);
          font-size: 0.95rem;
          font-weight: 600;
          background: rgba(201, 169, 98, 0.15);
          padding: 0.35rem 0.85rem;
          border-radius: 20px;
        }

        .variant-price-included {
          color: var(--color-platinum);
          opacity: 0.5;
          font-size: 0.85rem;
          font-style: italic;
        }

        /* Quantity Selector */
        .quantity-selector {
          margin-bottom: 2rem;
        }

        .quantity-label {
          display: block;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-platinum);
          opacity: 0.6;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0;
          width: fit-content;
          background: var(--color-onyx);
          border: 2px solid var(--color-smoke);
          border-radius: 12px;
          overflow: hidden;
        }

        .quantity-btn {
          width: 52px;
          height: 52px;
          background: transparent;
          border: none;
          color: var(--color-platinum);
          font-size: 1.5rem;
          cursor: pointer;
          transition: all var(--duration-fast) var(--transition-smooth);
        }

        .quantity-btn:hover:not(:disabled) {
          background: var(--color-smoke);
          color: var(--color-gold);
        }

        .quantity-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .quantity-value {
          width: 70px;
          text-align: center;
          font-size: 1.25rem;
          color: var(--color-platinum);
          font-weight: 600;
          border-left: 1px solid var(--color-smoke);
          border-right: 1px solid var(--color-smoke);
          padding: 0.5rem 0;
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .add-to-cart-btn {
          flex: 1;
          padding: 1.25rem 2rem;
          background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
          border: none;
          border-radius: 12px;
          color: var(--color-obsidian);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--duration-normal) var(--transition-smooth);
          position: relative;
          overflow: hidden;
        }

        .add-to-cart-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .add-to-cart-btn:hover::before {
          left: 100%;
        }

        .add-to-cart-btn:hover {
          background: linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 100%);
          transform: translateY(-3px);
          box-shadow: 0 10px 40px rgba(201, 169, 98, 0.4);
        }

        .add-to-cart-btn.added {
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
        }

        .wishlist-btn {
          width: 60px;
          height: 60px;
          background: var(--color-onyx);
          border: 2px solid var(--color-smoke);
          border-radius: 12px;
          color: var(--color-platinum);
          font-size: 1.5rem;
          cursor: pointer;
          transition: all var(--duration-fast) var(--transition-smooth);
        }

        .wishlist-btn:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
          transform: translateY(-3px);
        }

        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .feature-card {
          padding: 1.5rem;
          background: var(--color-onyx);
          border: 1px solid var(--color-smoke);
          border-radius: 12px;
          animation: fadeInUp 0.6s var(--transition-smooth) forwards;
          opacity: 0;
          transition: all var(--duration-normal) var(--transition-smooth);
        }

        .feature-card:hover {
          border-color: var(--color-gold-dark);
          transform: translateY(-4px);
        }

        .feature-icon {
          font-size: 1.75rem;
          display: block;
          margin-bottom: 0.75rem;
        }

        .feature-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-cream);
          margin-bottom: 0.5rem;
        }

        .feature-description {
          font-size: 0.85rem;
          color: var(--color-platinum);
          opacity: 0.7;
          line-height: 1.6;
        }

        /* Specifications */
        .specifications {
          padding-top: 2rem;
          border-top: 1px solid var(--color-smoke);
        }

        .specs-title {
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-cream);
          margin-bottom: 1.5rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .specs-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--color-graphite);
        }

        .spec-label {
          font-size: 0.85rem;
          color: var(--color-platinum);
          opacity: 0.6;
        }

        .spec-value {
          font-size: 0.9rem;
          color: var(--color-platinum);
          font-weight: 500;
        }

        /* Sticky Checkout */
        .sticky-checkout {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem 3rem;
          background: rgba(10, 10, 10, 0.98);
          backdrop-filter: blur(20px);
          border-top: 1px solid var(--color-smoke);
          transform: translateY(100%);
          transition: transform var(--duration-normal) var(--transition-smooth);
          z-index: 1000;
        }

        .sticky-checkout.visible {
          transform: translateY(0);
        }

        .sticky-checkout-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .sticky-price {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }

        .sticky-currency {
          font-family: var(--font-display);
          font-size: 1rem;
          color: var(--color-gold);
        }

        .sticky-price-value {
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--color-gold);
          font-weight: 500;
        }

        .sticky-add-to-cart {
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
          border: none;
          border-radius: 10px;
          color: var(--color-obsidian);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--duration-fast) var(--transition-smooth);
        }

        .sticky-add-to-cart:hover {
          background: var(--color-gold-light);
          transform: translateY(-2px);
          box-shadow: var(--shadow-gold);
        }

        /* Footer */
        .footer {
          padding: 4rem 3rem;
          border-top: 1px solid var(--color-smoke);
          margin-top: 4rem;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          text-align: center;
        }

        .footer-brand {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          color: var(--color-gold);
          margin-bottom: 0.5rem;
        }

        .footer-tagline {
          font-size: 0.9rem;
          color: var(--color-platinum);
          opacity: 0.5;
          margin-bottom: 2rem;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        .footer-links a {
          color: var(--color-platinum);
          text-decoration: none;
          font-size: 0.85rem;
          opacity: 0.5;
          transition: opacity var(--duration-fast);
        }

        .footer-links a:hover {
          opacity: 1;
          color: var(--color-gold);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .product-visuals {
            position: relative;
            top: 0;
          }

          .hero-title {
            font-size: 3.5rem;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 1rem 1.5rem;
          }

          .nav-links {
            display: none;
          }

          .hero {
            padding: 10rem 1.5rem 3rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .product-section {
            padding: 2rem 1.5rem;
          }

          .features-grid,
          .specs-list {
            grid-template-columns: 1fr;
          }

          .sticky-checkout {
            padding: 1rem 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}
