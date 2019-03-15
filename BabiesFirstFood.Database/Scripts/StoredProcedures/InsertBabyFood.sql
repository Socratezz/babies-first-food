IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.InsertBabyFood'))
   exec('CREATE PROCEDURE [dbo].[InsertBabyFood] AS BEGIN SET NOCOUNT ON; END')
GO

ALTER PROC [dbo].[InsertBabyFood] (
	@StartDate date,
	@EndDate date,
	@Food varchar(200),
	@Liked bit,
	@Disliked bit,
	@AllergyReaction bit,
	@Comments varchar(500)
)

AS
BEGIN
    if not exists (select 1 from BabyFood where lower(Food) = lower(@Food)) begin
		insert into BabyFood (
			StartDate
			, EndDate
			, Food
		)
		values (
			@StartDate
			, @EndDate
			, @Food
		)
		SELECT SCOPE_IDENTITY()
	end
	else begin
		select 0
	end
END
GO