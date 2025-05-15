import '../styles/homepage.css'
function HomePage() {
  return (
    <>
      <div className='homepage'>
        <div className="title_login">
          <h1>SalesTraction</h1>
          <a href='/login'>Login</a>
        </div>
        <div className="catchphrase">
          <p>Built for founders who move fast and students who sell faster. </p>
        </div>
        <div className="iam">
          <div className="student">
            <a href="/student/home">I'm a student</a>
          </div>
          <div className="startup">
            <a href="/startup/home">I'm a start-up</a>
          </div>
        </div>
        <div className="description">
          <p>Logoden biniou degemer mat an penn, ar bed danvez Skrigneg.
            Atlantel c’horn chase tagañ, ifern he bloavezh huanadiñ, ouzhit kav.
            Neuze amanenn moereb evañ, gwech rimiañ paner niz, levrioù kibellañ.
            Aod yaouank lavarout glav, tevel gouelañ mui eil, an da. C’hwec’hvet pounner flourañ e pegoulz ar, egisto regiñ las diskenn.
            Evel  e prenañ Ar Vouster nadoz c’hoarvezout, heuliañ a skuizhañ huchal.
            Pa vihan neuze digant kotoñs dougen, pal gwastell azezañ horolaj.
            Bro unan galleg avat Egineg me, kennebeut dleout bann gador.
            Tro drezoc’h gouiziek kribañ bragoù ur, traoñ ganit onest erc’h.
            Ur gantañ lann tog da goullo, leskiñ oabl yenijenn kibell.
          </p>
        </div>
        <div className="chiffre">
          <div><p>99.9 %</p></div>
          <div><p>Satisfied customer</p></div>
        </div>
        <div className="avis">
          <div>
            <div className="image_client"><img src="clara.jpg"></img></div>
            <div className="star_sentence">
              <div className="star">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFF55"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFF55"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFF55"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFF55"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFF55"><path d="m606-286-33-144 111-96-146-13-58-136v312l126 77ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" /></svg>
              </div>
              <div className="sentence"><p>Amazing ! I earn a lot of money !</p></div>
            </div>
          </div>
        </div>
        <div className="footer">
          <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M400-320h160q17 0 28.5-11.5T600-360v-80h-80v40h-80v-160h80v40h80v-80q0-17-11.5-28.5T560-640H400q-17 0-28.5 11.5T360-600v240q0 17 11.5 28.5T400-320Zm80 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>Emilie Le Rouzic & Maxime Phalippou</p>
        </div>
      </div>
    </>
  )
}

export default HomePage
