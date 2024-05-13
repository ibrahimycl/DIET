import Layout from "../../layout";

function Home() {
  return (
    <Layout>
      <section className="w-full bg-first flex justify-center">
        <div className="max-w-5xl mx-auto text-white">
          <div className="py-40 flex flex-col justify-center items-center">
            <h1 className="w-full font-bold text-5xl mb-20 text-center">Diyetisyen topluluğuna hoş geldiniz!</h1>
            <p className="text-xl">Sağlıklı beslenme için doğru adres.</p>
            <p className="text-xl">Uzman diyetisyenler, size özel çözümler sunuyor.</p>
          </div>
        </div>
      </section>
      <section className="w-full max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center flex-wrap ">
          <a href="/" className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-4 sm:m-8 md:m-8 mx-auto rounded-xl overflow-hidden cursor-pointer">
            <img className="w-full rounded-xl" src="src/assets/dietitian.jpg" alt="Resim 1" />
            <div className="text-black text-center absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 backdrop-filter backdrop-blur-sm">
              <span>Diyetisyen</span>
            </div>
          </a>
          <a href="/community" className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-4 sm:m-8 md:m-8 mx-auto rounded-xl overflow-hidden cursor-pointer">
            <img className="w-full rounded-xl" src="src/assets/community.jpg" alt="Resim 2" />
            <div className="text-black  text-center absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 backdrop-filter backdrop-blur-sm">
              <span >Topluluk</span>
            </div>
          </a>
          <a href="/packages" className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-4 sm:m-8 md:m-8 mx-auto rounded-xl overflow-hidden cursor-pointer">
            <img className="w-full rounded-xl" src="src/assets/packages.png" alt="Resim 3" />
            <div className="text-black  text-center absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 backdrop-filter backdrop-blur-sm">
              <span className="text-black">Paketler</span>
            </div>
          </a>
        </div>   
      </section>
    </Layout>
  );
}

export default Home;
