'use client'
import Image from "next/image";
// import styles from "./page.module.css";


// import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Sitemap from '@/components/Sitemap';
import {useParams} from "next/navigation";
// const baseurl = import.meta.env.REACT_APP_API_BASE_URL;
const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL;

function TopPage() {

  const { id } = useParams()

  useEffect(()=>{
    localStorage.setItem("userID", id)

  },[
    id
  ])
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    getUserData(id)
  },[id])

  const getUserData = (id)=>{
    setLoading(true);
    setError(null);
    
    let config = {
      method: 'get',
      url: `${baseurl}/api/user-products/${id}`,
    };
    axios(config)
        .then(async (response) => {
          setProducts(response.data.products || []);
          setLoading(false);
        })
        .catch((err)=>{
          setLoading(false);
          setError(
            err.response?.data?.message || 
            err.message || 
            "データの取得に失敗しました。APIのURLを確認してください。"
          );
        })
  }

  return(
      <>
        <Header/>
        <div className="product">
          <section className="top">
            <div className="top-img">
              <img src="/assets/images/top-img.png" alt=""/>
              <img src="/assets/images/top-img02.png" className="sp" alt=""/>
            </div>
            <img src="/assets/images/logo.svg" className="top-logo-img" alt=""/>
            <p className="top-text1">ロイヤルジャパン<br/>公式オンラインショッピング</p>
            <p className="top-text2">愛の証を超濃厚に、超濃密に</p>
            <p className="top-text3">ふたりだけの夜をもっと愉しむために</p>
          </section>
          <section className="site">
            <div className="contain">
              <div className="wrap">
                <div className="site-part">
                  <div className="site-part-thumb">
                    <img src="/assets/images/site01.png" alt=""/>
                  </div>
                  <h3 className="site-part-title">
                    大自然の恵み”トンカットアリ” <br/>
                    製造している製品の含有成分は７種類の自然成分です。
                  </h3>
                </div>
                <div className="site-part">
                  <div className="site-part-thumb">
                    <img src="/assets/images/site02.png" alt=""/>
                  </div>
                  <h3 className="site-part-title">
                    私たちはETUMAX社マレーシアで純正ロイヤルハニーを<br/>
                    製造しているため、安心の販売実績があります。
                  </h3>
                </div>
                <div className="site-part">
                  <div className="site-part-thumb">
                    <img src="/assets/images/site03.png" alt=""/>
                  </div>
                  <h3 className="site-part-title">
                    円満な夫婦・恋人との夜の性生活に <br/>
                    天然の性欲増強剤です。愛を深める秘密の秘薬できっかけを
                  </h3>
                </div>
              </div>
              <a href="" className="site-link"><p>当サイトについて</p><span></span></a>
            </div>
          </section>
          <section className="list">
            <div className="list-title">
              全ての商品
            </div>
            <div className="contain">
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "60px 20px",
                    fontFamily: "hiraginoSansGBW3",
                    fontSize: "18px",
                    color: "#000",
                    width: "100%",
                  }}
                >
                  Loading...
                </div>
              ) : error ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "60px 20px",
                    fontFamily: "hiraginoSansGBW3",
                    fontSize: "16px",
                    color: "#FF0000",
                    width: "100%",
                  }}
                >
                  <p style={{ marginBottom: "20px", textAlign: "center" }}>
                    {error}
                  </p>
                  <button
                    onClick={() => getUserData(id)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "5px",
                      background: "#7c0026",
                      color: "#fff",
                      border: "1px solid #7c0026",
                      fontFamily: "hiraginoSansGBW6",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    再試行
                  </button>
                </div>
              ) : products.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "60px 20px",
                    fontFamily: "hiraginoSansGBW3",
                    fontSize: "18px",
                    color: "#000",
                    width: "100%",
                  }}
                >
                  データが見つかりませんでした
                </div>
              ) : (
                products.map((item, index)=>(
                    <div className="list-item" key={index}>
                      <div className="list-item-thumb">
                        <img src={item.image} alt=""/>
                      </div>
                      <h3 className="list-item-title">
                        {item.title}
                      </h3>
                      <div className="list-item-package">
                        {item.package}
                      </div>
                      <p className="list-item-content">
                        {item.description}
                      </p>
                      <div className="list-item-price">
                        <div className="wrap">
                          <div className="list-item-price-title">
                            特別限定価格
                          </div>
                          <p>{parseInt(item.price_sell).toLocaleString('en-US').toString()} <span>(税込)</span></p>
                        </div>
                        <a href={`/products/${id}/${item.id}`}>今すぐ購入する</a>
                      </div>
                    </div>
                ))
              )}
            </div>
          </section>
          <section className="social">
            <div className="contain">
              <div className="social-part">
                <div className="social-left">
                  <div className="social-title">
                    <p>Twitter</p>
                    <p><img src="/assets/images/icon-instagram.png" alt=""/><span>Instagram</span></p>
                  </div>
                  <div className="social-left-title">
                    フォロー&投稿<br/>
                    プレゼントキャンペーン
                  </div>
                </div>
                <div className="social-right">
                  <img src="/assets/images/twitter-thumb.png" alt=""/>
                  <p>9,800円相当をプレゼント！</p>
                </div>
              </div>
              <div className="social-part">
                <div className="social-top">
                  <div className="social-title">
                    <p><span>LINE</span>の<br/>友達追加で</p>
                  </div>
                  <div className="social-top-title">
                    <p>今すぐ使える</p>
                    <div className="social-top-perc">
                      ¥500 OFF<br/>
                      クーポンゲット!
                    </div>
                  </div>
                  <a href="" className="line-btn"><img src="/assets/images/line.png" alt=""/><p>友だち追加はこちら</p></a>
                </div>
                <div className="social-bottom">
                  <p>最新情報やお得なクーポンをLINEでお届けします♫</p>
                </div>
              </div>
            </div>
          </section>
          <section className="others">
            <div className="contain">
              <div className="others-item">
                <div className="others-item-left">
                  <img src="/assets/images/people-line-solid.svg" alt=""/>
                </div>
                <div className="others-item-right">
                  <h3 className="others-item-title">
                    取扱について
                  </h3>
                  <p>クレジットカード決済がご利用可能になりました。平素よりVITAMAX公式通販ショップをご利用頂き、誠に有難うございます。 この</p>
                </div>
              </div>
              <div className="others-item">
                <div className="others-item-left">
                  <img src="/assets/images/cart-arrow-down-solid.svg" alt=""/>
                </div>
                <div className="others-item-right">
                  <h3 className="others-item-title">
                    定期購入
                  </h3>
                  <p>クレジットカード決済がご利用可能になりました。平素よりVITAMAX公式通販ショップをご利用頂き、誠に有難うございます。 この</p>
                </div>
              </div>
              <div className="others-item">
                <div className="others-item-left">
                  <img src="/assets/images/headset-solid.svg" alt=""/>
                </div>
                <div className="others-item-right">
                  <h3 className="others-item-title">
                    サポート
                  </h3>
                  <p>クレジットカード決済がご利用可能になりました。平素よりVITAMAX公式通販ショップをご利用頂き、誠に有難うございます。 この</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer/>
        <Sitemap/>

      </>
  )
}
export default TopPage;
// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol>
//           <li>
//             Get started by editing <code>src/app/page.js</code>.
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>
//
//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.secondary}
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
