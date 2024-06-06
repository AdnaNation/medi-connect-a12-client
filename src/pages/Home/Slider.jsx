const Slider = () => {
  return (
    <div
      className="bg-no-repeat w-full h-[700px]"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/gSzY2t4/innocent-peoples-dna-400x267.jpg)",
        backgroundSize: "100% 700px",
        backgroundPosition: "center",
      }}
    >
      <div className="ml-9 mb-20 bg-opacity-100 w-full h-full">
        <div>
          <h1 className="lg:mb-5 mb-3 text-xl md:text-4xl font-bold">
            COVID-19 RT-PCR Test
          </h1>
          <p className="font-bold">
            Get your COVID-19 RT-PCR test with fast and reliable results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slider;
