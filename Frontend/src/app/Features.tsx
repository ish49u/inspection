const Features = () => (
  <section className="py-12 bg-gray-100 text-black">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          "Schedule an inspection by providing details.",
          "Inspector will proceed with the inspection.",
          "Receive a detailed report to support your claim.",
        ].map((item, index) => (
          <div key={index} className="p-6 bg-white shadow-lg rounded">
            <p
              className={`text-${
                index === 0 ? "blue" : index === 1 ? "green" : "red"
              }-500`}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
