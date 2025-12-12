// ** styles Import
import { options } from '../../../data/home';
import styles from './index.module.scss';

// ** Another Import
import { useEffect, useRef, useState } from 'react';

function Header() {
  // ** State
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
  });

  const menuRef = useRef<HTMLElement>(null);

  // ** Function
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 70,
        behavior: 'smooth',
      });
    }
    setOpen(false);
  };

  const handleMenuClick = (item: any, e: any) => {
    setActive(item.id);
    scrollToSection(item.id);

    setUnderlineStyle({
      left: e.target.offsetLeft,
      width: e.target.offsetWidth,
    });
  };

  // ** useEffect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      options.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActive(sec.id);
        }
      });
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Zootopia<span className={styles.pink}>Kids</span>
        </div>

        {/* -------- Desktop Menu -------- */}
        <nav className={styles.menu} ref={menuRef}>
          {options.map((item) => (
            <div
              key={item.id}
              className={`${styles['menu-item']} ${
                active === item.id ? styles.active : ''
              }`}
              onClick={(e) => handleMenuClick(item, e)}
            >
              {item.label}
            </div>
          ))}

          <span
            className={styles['moving-underline']}
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
            }}
          />
        </nav>

        <button
          className={styles.cta}
          onClick={() => scrollToSection('contact')}
        >
          Đăng ký ngay
        </button>

        {/* -------- Mobile Hamburger -------- */}
        <div
          className={`${styles.hamburger} ${open ? styles.active : ''}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* -------- Mobile Menu -------- */}
      <div className={`${styles['mobile-menu']} ${open ? styles.open : ''}`}>
        {options.map((item) => (
          <button key={item.id} onClick={() => scrollToSection(item.id)}>
            {item.label}
          </button>
        ))}

        <button
          className={styles['mobile-cta']}
          onClick={() => scrollToSection('contact')}
        >
          Đăng ký ngay
        </button>
      </div>
    </header>
  );
}

export default Header;
