import React from 'react'
import HeaderRoot from '../../../components/Header/HeaderRoot'

function Root() {
  setTimeout(() => {
    ;(function () {
      const win = window
      const doc = document.documentElement

      doc.classList.remove('no-js')
      doc.classList.add('js')

      // Reveal animations
      if (document.body.classList.contains('has-animations')) {
        /* global ScrollReveal */
        const sr = (window.sr = ScrollReveal())

        sr.reveal('.feature, .pricing-table-inner', {
          duration: 600,
          distance: '20px',
          easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
          origin: 'bottom',
          interval: 100,
        })

        doc.classList.add('anime-ready')
        /* global anime */
        anime
          .timeline({
            targets: '.hero-figure-box-05',
          })
          .add({
            duration: 400,
            easing: 'easeInOutExpo',
            scaleX: [0.05, 0.05],
            scaleY: [0, 1],
            perspective: '500px',
            delay: anime.random(0, 400),
          })
          .add({
            duration: 400,
            easing: 'easeInOutExpo',
            scaleX: 1,
          })
          .add({
            duration: 800,
            rotateY: '-15deg',
            rotateX: '8deg',
            rotateZ: '-1deg',
          })

        anime
          .timeline({
            targets: '.hero-figure-box-06, .hero-figure-box-07',
          })
          .add({
            duration: 400,
            easing: 'easeInOutExpo',
            scaleX: [0.05, 0.05],
            scaleY: [0, 1],
            perspective: '500px',
            delay: anime.random(0, 400),
          })
          .add({
            duration: 400,
            easing: 'easeInOutExpo',
            scaleX: 1,
          })
          .add({
            duration: 800,
            rotateZ: '20deg',
          })

        anime({
          targets:
            '.hero-figure-box-01, .hero-figure-box-02, .hero-figure-box-03, .hero-figure-box-04, .hero-figure-box-08, .hero-figure-box-09, .hero-figure-box-10',
          duration: anime.random(600, 800),
          delay: anime.random(600, 800),
          rotate: [
            anime.random(-360, 360),
            function (el) {
              return el.getAttribute('data-rotation')
            },
          ],
          scale: [0.7, 1],
          opacity: [0, 1],
          easing: 'easeInOutExpo',
        })
      }
    })()
  }, 1500)
  return (
    <>
      <HeaderRoot />
      <main>
        <section className={'hero'}>
          <div className="container">
            <div className="hero-inner">
              <div className="hero-copy">
                <h1 className="hero-title mt-0">Рекламма и маркетинг</h1>
                <p className="hero-paragraph">
                  Консультация по лубым вопросам от А до Я
                </p>
                <div className="hero-cta">
                  <a
                    className="button button-primary"
                    href="https://t.me/av_pay_bot"
                    target="_blank"
                  >
                    Оплатить
                  </a>
                  <a
                    className="button"
                    href="https://t.me/Ayvazyan_VK"
                    target="_blank"
                  >
                    Потдержка
                  </a>
                </div>
              </div>
              <div className="hero-figure anime-element">
                <svg
                  className="placeholder"
                  width="528"
                  height="396"
                  viewBox="0 0 528 396"
                >
                  <rect
                    width="528"
                    height="396"
                    style={{ fill: 'transparent' }}
                  />
                </svg>
                <div
                  className="hero-figure-box hero-figure-box-01"
                  data-rotation="45deg"
                ></div>
                <div
                  className="hero-figure-box hero-figure-box-02"
                  data-rotation="-45deg"
                ></div>
                <div
                  className="hero-figure-box hero-figure-box-03"
                  data-rotation="0deg"
                ></div>
                <div
                  className="hero-figure-box hero-figure-box-04"
                  data-rotation="-135deg"
                ></div>
                <div className="hero-figure-box hero-figure-box-05"></div>
                <div className="hero-figure-box hero-figure-box-06"></div>
                <div className="hero-figure-box hero-figure-box-07"></div>
                <div
                  className="hero-figure-box hero-figure-box-08"
                  data-rotation="-22deg"
                ></div>
                <div
                  className="hero-figure-box hero-figure-box-09"
                  data-rotation="-52deg"
                ></div>
                <div
                  className="hero-figure-box hero-figure-box-10"
                  data-rotation="-50deg"
                ></div>
              </div>
            </div>
          </div>
        </section>
        <section className={'pricing section'}>
          <div className="container-sm">
            <div className="pricing-inner section-inner">
              <div className="pricing-header text-center">
                <h2 className="section-title mt-0">Стоимость услуг</h2>
              </div>
              <div className="pricing-tables-wrap">
                <div className="pricing-table">
                  <div className="pricing-table-inner is-revealing">
                    <div className="pricing-table-main">
                      <div className="pricing-table-header pb-24">
                        <div className="pricing-table-price">
                          <span className="pricing-table-price-currency h2">
                            р
                          </span>
                          <span className="pricing-table-price-amount h1">
                            500
                          </span>
                          <span className="text-xs">/услугу</span>
                        </div>
                      </div>
                      <div className="pricing-table-features-title text-xs pt-24 pb-24">
                        В стоимость входит
                      </div>
                      <ul className="pricing-table-features list-reset text-xs">
                        <li>
                          <span>Консультация</span>
                        </li>
                        <li>
                          <span>Настройка</span>
                        </li>
                        <li>
                          <span>Запуск</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pricing-table-cta mb-8">
                      <a
                        className="button button-primary button-shadow button-block"
                        href="https://t.me/av_pay_bot"
                        target="_blank"
                      >
                        Оплптить
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="cta section">
          <div className="container">
            <div className="cta-inner section-inner">
              <h3 className="section-title mt-0">
                Индивидуальным предпринимателем Айвазян Вардан Каренович (ОГРНИП
                323237500187052, ИНН 237203080834)
              </h3>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Root
