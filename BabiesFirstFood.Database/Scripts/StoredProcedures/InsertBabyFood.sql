IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.InsertBabyFood'))
   exec('CREATE PROCEDURE [dbo].[InsertBabyFood] AS BEGIN SET NOCOUNT ON; END')
GO

ALTER PROC [dbo].[InsertBabyFood] (
	@Date date,
	@Food varchar(200)
)

AS
BEGIN
    if not exists (select 1 from BabyFood where Date = @Date) begin
		insert into BabyFood (
			Date
			, Food
		)
		values (
			@Date
			, @Food
		)
		SELECT SCOPE_IDENTITY()
	end
	else begin
		update BabyFood set Food = @Food where Date = @Date
	end
END
GO