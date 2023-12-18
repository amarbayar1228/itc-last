import SimpleMotion from "@/components/assist/simpleMotion";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProjectComp from "@/components/project";
import Head from "next/head";

const Project = () => {
  return (
    <div>
      <Head>
        <title>ГТСМТТ</title>
        <meta name="page" content="Тавтай морилно уу." key="desc" />
        <meta name="description" content="Тавтай морилно уу." />
        <link rel="icon" href="/images/brand/itc.svg" />
      </Head>
      <Breadcrumb name="Төсөл" router={"project"} />
      <SimpleMotion>
        <ProjectComp />
      </SimpleMotion>
      <div className="absolute bottom-0 w-full h-72 max-md:relative">
        <Footer />
      </div>
    </div>
  );
};
export default Project;
