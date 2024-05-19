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

      <section className="w-full bg-gray-100">
        <div className="max-w-5xl mx-auto py-20 px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Sağlıklı Yaşam İpuçları</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Dengeli Beslenme</h3>
              <p className="text-gray-700">Günlük hayatınızda dengeli beslenmeye özen gösterin. Daha fazla meyve, sebze ve protein tüketmeye çalışın.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Su İçmeyi Unutmayın</h3>
              <p className="text-gray-700">Günde en az 8 bardak su içmeyi ihmal etmeyin. Su, vücudunuzun düzgün çalışması için hayati öneme sahiptir.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Düzenli Egzersiz</h3>
              <p className="text-gray-700">Haftada en az 3-4 kez egzersiz yaparak sağlığınızı koruyun. Yürüyüş, koşu veya yoga gibi aktiviteleri tercih edebilirsiniz.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="max-w-5xl mx-auto py-20 px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Müşteri Referansları</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Ali K.</h3>
              <p className="text-gray-700">Diyetisyen topluluğundan aldığım destekle kilo vermek artık çok daha kolay. Teşekkürler!</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Ayşe Y.</h3>
              <p className="text-gray-700">Paketlerinden birini denedim ve sonuçtan çok memnun kaldım. Herkese tavsiye ederim.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Mehmet T.</h3>
              <p className="text-gray-700">Topluluğunuzun sunduğu bilgiler gerçekten değerli. Sağlıklı yaşam konusunda çok şey öğrendim.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Home;
