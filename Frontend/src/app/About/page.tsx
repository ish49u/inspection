import Footer from "../Footer";
import Header from "../Navbar/page";

const About = () => (
  <>
    <Header />
    <section
      className="flex items-center justify-center min-h-screen bg-gray-100 text-black"
      style={{
        backgroundImage: `url('/Images/aboutus.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center bg-white bg-opacity-70 p-6 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="mb-6">
          Empowering customers, inspectors, and insurance companies through
          seamless and transparent vehicle inspection services.
        </p>
        <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
        <p>
          To become the leading platform for unbiased vehicle inspections
          globally.
        </p>
      </div>
    </section>
  </>
);

export default About;
