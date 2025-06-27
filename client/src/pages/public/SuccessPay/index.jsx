import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../actions'
import logo from '../../../images/t-bank-inverse.svg'
import res from '../../../images/check-dark.svg'
import { useLocation } from 'react-router-dom'

function SuccessPay() {
  const dispatch = useDispatch()
  const { search } = useLocation()
  const loader = useSelector((state) => state.app.loadings.seo)
  useEffect(() => {
    if (search) {
      const searchParams = new URLSearchParams(search)
      const orderId = Number(searchParams.get('OrderId'))
      dispatch(actions.seoInfo({ orderId }))
    }
  }, [dispatch, search])

  return (
    <>
      <header className={'site-header'}>
        <div className={'container'}>
          <div className={'site-header-inner'}>
            <div className={'brand header-brand'}>
              <h1 className={'m-0'}>
                <a href={'/'}>
                  <img
                    className="header-logo-image"
                    src={`${logo}`}
                    alt="Logo"
                    width={100}
                    height={100}
                  />
                </a>
              </h1>
            </div>
          </div>
        </div>
      </header>
      <main className={'d-flex'}>
        <div className={'sum'}>
          <p>100 р</p>
        </div>
        <div className={'result'}>
          <img
            className="header-logo-image"
            src={`${res}`}
            alt="Logo"
            width={150}
            height={150}
          />
          {loader ? (
            <button className={'button-link'}>
              <span className="loader"></span>
            </button>
          ) : (
            <a href={'https://t.me/av_pay_bot'} className={'button-link'}>
              <span className="link-text">Вернуться в магазин</span>
            </a>
          )}
        </div>
      </main>
    </>
  )
}
export default SuccessPay
