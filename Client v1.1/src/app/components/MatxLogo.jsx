import useSettings from "app/hooks/useSettings";

const MatxLogo = ({ className }) => {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    <img
      src="../assets/images/pmcRound.png"
      alt=""
      // height="72px"
      // width="190px"
      width="48px"
    />
  );
};

export default MatxLogo;
