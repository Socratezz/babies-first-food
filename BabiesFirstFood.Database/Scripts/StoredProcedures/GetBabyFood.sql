IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.GetBabyFood'))
   exec('CREATE PROCEDURE [dbo].[GetBabyFood] AS BEGIN SET NOCOUNT ON; END')
GO

ALTER PROC [dbo].[GetBabyFood] (
	@StartDate date = null,
	@EndDate date
)

AS
BEGIN
    if @StartDate is not null begin
		select * from dbo.BabyFood where Date >= @StartDate and Date <= @EndDate
	end
	else begin
		select * from dbo.BabyFood where Date <= @EndDate
	end 
END
GO