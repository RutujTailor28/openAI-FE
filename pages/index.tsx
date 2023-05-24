import axios from "axios";
import Chip from "@/components/Chip";
import { useRouter } from "next/router";

export default function Index(props: any) {
  const router = useRouter();
  const { techAndFrameworkList } = props;
  const chipData = techAndFrameworkList?.map((data: any) => ({name: data?.name, id: data?.id}));
  const clickHandler = (data: any) => {
    router.push(`/${data.id}`);
  };

  return (
    <>
      <main>
        <div className="flex text-3xl place-content-center mt-48">
          Pick any one of the following
        </div>
        <div className="flex text-center gap-8 place-content-center mt-20">
          <Chip chipData={chipData} onClick={clickHandler} />
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async (context: any) => {
  const response = await axios.get(
    `http://localhost:4000/techAndFrameworkList`
  );
  const techAndFrameworkList = response?.data?.techAndFrameworkList;
  return {
    props: {
      techAndFrameworkList: techAndFrameworkList,
    },
  };
};
