'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Seasons = sequelize.define('seasons', {
    // System
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    player_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    // User Generated
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    // nba player stats
    group_set: DataTypes.STRING,
    group_value: DataTypes.STRING,
    team_id: DataTypes.INTEGER,
    team_abreviation: DataTypes.STRING,
    max_game_date: DataTypes.DATE,
    gp: DataTypes.INTEGER,
    w: DataTypes.INTEGER,
    l: DataTypes.INTEGER,
    w_pct: DataTypes.DECIMAL,
    min: DataTypes.INTEGER,
    usg_pct: DataTypes.DECIMAL,
    pct_fgm: DataTypes.DECIMAL,
    pct_fga: DataTypes.DECIMAL,
    pct_fg3m: DataTypes.DECIMAL,
    pct_fg3a: DataTypes.DECIMAL, 
    pct_ftm: DataTypes.DECIMAL,
    pct_fta: DataTypes.DECIMAL, 
    pct_oreb: DataTypes.DECIMAL,
    pct_dreb: DataTypes.DECIMAL,
    pct_reb: DataTypes.DECIMAL, 
    pct_ast: DataTypes.DECIMAL, 
    pct_tov: DataTypes.DECIMAL,
    pct_stl: DataTypes.DECIMAL,
    pct_blk: DataTypes.DECIMAL, 
    pct_blka: DataTypes.DECIMAL,
    pct_pf: DataTypes.DECIMAL,
    pct_pfd: DataTypes.DECIMAL,
    pct_pts: DataTypes.DECIMAL, 
    gp_rank: DataTypes.INTEGER,
    w_rank: DataTypes.INTEGER, 
    l_rank: DataTypes.INTEGER,
    w_pct_rank: DataTypes.INTEGER,
    min_rank: DataTypes.INTEGER, 
    usg_pct_rank: DataTypes.INTEGER, 
    pct_fgm_rank: DataTypes.INTEGER,
    pct_fga_rank: DataTypes.INTEGER,  
    pct_fg3m_rank: DataTypes.INTEGER,
    pct_fg3a_rank: DataTypes.INTEGER,
    pct_ftm_rank: DataTypes.INTEGER,
    pct_fta_rank: DataTypes.INTEGER,
    pct_oreb_rank: DataTypes.INTEGER,
    pct_dreb_rank: DataTypes.INTEGER, 
    pct_reb_rank: DataTypes.INTEGER,
    pct_ast_rank: DataTypes.INTEGER, 
    pct_tov_rank: DataTypes.INTEGER,
    pct_stl_rank: DataTypes.INTEGER,
    pct_blk_rank: DataTypes.INTEGER,
    pct_blka_rank: DataTypes.INTEGER,
    pct_pf_rank: DataTypes.INTEGER,
    pct_pfd_rank: DataTypes.INTEGER,
    pct_pts_rank: DataTypes.INTEGER,
    cfid: DataTypes.INTEGER,
    cfparams: DataTypes.STRING,
    // system
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at:  DataTypes.DATE
  }, {
    underscored: true
  });

  return Seasons;
};