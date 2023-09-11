export const About: React.FC<{}> = () => {
  return (
    <>
      <div>
        <div className="flex justify-start">
          <p className="font-bold text-xl">Education History</p>
        </div>
        <div className="flex flex-col">
          <p className="mt-2 text-lg"> - Pibulsongkram Rajabhat University</p>
          <p className="text-base">
            Bachelor's degree computer engineering | July 2015 - Demcember 2019
            Grade point average:3.14
          </p>
          <p className="mt-2 text-lg">- Nabot Pittayakhom School</p>
          <p className="text-base">
            High School Science, | Math May 2009 - May 2015 Grade point
            average:3.64
          </p>
        </div>
      </div>
    </>
  );
};
