function StatCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        width: "135px",
        height: "64px",

        background: "#20242B",

        border: "1px solid #2F3542",

        borderRadius: "14px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        padding: "0 15px",

        transition: "0.25s",

        cursor: "default",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "11px",
            color: "#9AA4B2",
            marginBottom: "6px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "white",

            maxWidth: "72px",

            overflow: "hidden",

            whiteSpace: "nowrap",

            textOverflow: "ellipsis",
          }}
        >
          {value}
        </div>
      </div>

      <div
        style={{
          fontSize: "22px",
          color,
        }}
      >
        {icon}
      </div>
    </div>
  );
}

export default StatCard;